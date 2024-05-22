import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HashingService, JwtServiceUtils } from './utils';
import { UsersService } from '../users';
import { SignUpRequestDto, SigninRequestDto, SigninResponseDto } from './dto';
import { ValidateTokenResponseUserRPCDto } from '@app/grpc';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtServiceUtils,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
  ) {}

  async signup(payload: SignUpRequestDto): Promise<SigninResponseDto> {
    const { email, password, ...rest } = payload;

    // check if user email exists
    const exists = await this.usersService.exists(email);

    if (exists) {
      throw new ConflictException('email already exists');
    }

    // hash password
    const hashedPassword = await this.hashingService.hash(password);

    const user = await this.usersService.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error('Error creating user');
    }

    // generate access token

    const accessToken = await this.jwtService.generateAccessToken({
      userId: user.userId,
      email: user.email,
    });

    return {
      user,
      accessToken,
    };
  }

  async signin(payload: SigninRequestDto): Promise<SigninResponseDto> {
    const user = await this.usersService.findWithPassword(payload.email);

    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }

    // check password

    const passwordMatch = await this.hashingService.compare(
      user.password,
      payload.password,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Wrong credentials');
    }

    // generate access token

    const accessToken = await this.jwtService.generateAccessToken({
      userId: user.userId,
      email: user.email,
    });

    return {
      user,
      accessToken,
    };
  }

  // grpc methods

  async validateUserTokenRpc(
    token: string,
  ): Promise<ValidateTokenResponseUserRPCDto> {
    if (!token) {
      return {
        empty: {},
      };
    }

    try {
      const decoded = this.jwtService.verifyAccessToken(token);

      if (!decoded) {
        return {
          empty: {},
        };
      }

      return {
        user: {
          userId: decoded.userId,
          email: decoded.email,
        },
      };
    } catch (err) {
      return {
        empty: {},
      };
    }
  }
}
