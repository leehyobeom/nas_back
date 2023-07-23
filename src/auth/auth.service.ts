import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{userInfo: Record<string, any>, access_token: string}> {
    const payload = { 
      username: user.email, 
      first_name: user.first_name,
      last_name: user.last_name,
      company_name: user.company_name,
    };
    return {
      userInfo: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
