import {
  RpcAuthServiceController,
  RpcAuthServiceControllerMethods,
  ValidateTokenRequestRPCDto,
  ValidateTokenResponseRPCDto,
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
    | ValidateTokenResponseRPCDto
    | Observable<ValidateTokenResponseRPCDto>
    | Promise<ValidateTokenResponseRPCDto> {
    return this.authService.validateUserTokenRpc(request.token);
  }
}
