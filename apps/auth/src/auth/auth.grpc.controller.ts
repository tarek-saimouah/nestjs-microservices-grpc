import {
  RpcAuthServiceController,
  RpcAuthServiceControllerMethods,
  ValidateTokenRequestRPCDto,
  ValidateTokenResponseUserRPCDto,
} from '@app/grpc';
import { Controller, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
@Controller()
@RpcAuthServiceControllerMethods()
export class AuthGrpcController implements RpcAuthServiceController {
  constructor(private readonly authService: AuthService) {}

  validateUserTokenRpc(
    request: ValidateTokenRequestRPCDto,
  ):
    | ValidateTokenResponseUserRPCDto
    | Observable<ValidateTokenResponseUserRPCDto>
    | Promise<ValidateTokenResponseUserRPCDto> {
    return this.authService.validateUserTokenRpc(request.token);
  }
}
