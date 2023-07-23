import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [FileController],
  providers: [FileService, ConfigService],
  exports: [FileService]
})
export class FileModule {}