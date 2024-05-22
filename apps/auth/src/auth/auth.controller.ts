import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@app/common';
import { SignUpRequestDto, SigninRequestDto, SigninResponseDto } from './dto';

@ApiInternalServerErrorResponse()
@ApiNotAcceptableResponse()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'signup user',
  })
  @ApiResponse({ type: SigninResponseDto })
  @ApiConflictResponse()
  // permissions
  @Public()
  @Post('user/sign-up')
  signup(
    @Body() signUpRequestDto: SignUpRequestDto,
  ): Promise<SigninResponseDto> {
    return this.authService.signup(signUpRequestDto);
  }

  @ApiOperation({
    summary: 'signin user',
  })
  @ApiResponse({ type: SigninResponseDto })
  @ApiNotFoundResponse()
  // permissions
  @Public()
  @Post('user/sign-in')
  signin(
    @Body() signinRequestDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    return this.authService.signin(signinRequestDto);
  }
}
