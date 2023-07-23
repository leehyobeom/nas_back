import { Controller, Get, Request, Post, Put, Delete, Query } from '@nestjs/common';
import { FileService } from './file.service';
@Controller()
export class FileController {
  constructor(
    private readonly fileService: FileService
    ) {}

  @Get('file')
  async getFileList(@Query('path') path: string) {
    return await this.fileService.getFileList(path);
  }

  @Post('folder')
  async createFolder(@Request() req) {
    return await this.fileService.createFolder(req.body.email, req.body.path);
  }

  @Put('file')
  async moveFile(@Request() req) {
    return await this.fileService.moveFile(req.body.email, req.body.oldPath, req.body.newPath);
  }

  @Delete('file')
  async deleteFile(@Request() req) {
    return await this.fileService.deleteFile(req.body.email, req.body.path);
  }
}
