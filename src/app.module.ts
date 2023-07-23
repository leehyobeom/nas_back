import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [LoginModule, AuthModule, FileModule],
  providers: [],
})
export class AppModule {}
