import { Controller, Request, Response, Post, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard'
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { userInfo, access_token } = await this.authService.login(req.user);
    res.cookie('userInfo', userInfo, {maxAge: 24 * 60 * 60 * 1000, domain: "localhost"})
    res.cookie('access_token', access_token, {maxAge: 24 * 60 * 60 * 1000, domain: "localhost"})
    res.status(HttpStatus.OK).json([]);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
