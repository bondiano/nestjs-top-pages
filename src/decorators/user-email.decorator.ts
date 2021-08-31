import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEmail = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
