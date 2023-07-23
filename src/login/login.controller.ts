import { Controller, Request, Response, Post, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard'
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService} from '@nestjs/config';
import { FileService } from '../file/file.service';

@Controller()
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly config: ConfigService
    ) {}

  @Post('join')
  async join(@Request() req) {
    const result = await this.userService.create(req.body);
    await this.fileService.createFolder(result.email, "/");
    return await result;
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { userInfo, access_token } = await this.authService.login(req.user);
    res.cookie('userInfo', userInfo, {maxAge: 24 * 60 * 60 * 1000, domain: this.config.get<string>('FRONT_HOST')})
    res.cookie('access_token', access_token, {maxAge: 24 * 60 * 60 * 1000, domain: this.config.get<string>('FRONT_HOST')})
    res.status(HttpStatus.OK).json([]);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
