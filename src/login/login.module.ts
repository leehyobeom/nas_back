import { Module, forwardRef } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from "../file/file.module";

@Module({
  imports: [AuthModule, ConfigModule, UserModule, FileModule],
  controllers: [LoginController],
})
export class LoginModule {}
