import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecodedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest()?.user,
);
