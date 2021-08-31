import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_USER } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDTO) {
    const oldUser = await this.authService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_USER);
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDTO) {
    const { email } = await this.authService.validateUser(login, password);

    return this.authService.login(email);
  }
}
