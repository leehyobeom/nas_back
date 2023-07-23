import { Controller, Get, Request, Post } from '@nestjs/common';
import { FileService } from './file.service';
@Controller()
export class FileController {
  constructor(
    private readonly fileService: FileService
    ) {}

  @Get('file')
  async getFileList(@Request() req) {
    return await this.fileService.getFileList();
  }

  @Post('folder')
  async createFolder(@Request() req) {
    return await this.fileService.createFolder(req.body.email, req.body.path);
  }
}
