import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService} from '@nestjs/config';
@Injectable()
export class FileService {

  s3 = new AWS.S3({
        region: this.config.get('AWS_BUCKET_REGION'),
        credentials: {
            accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
        },
    });
  constructor(
    private readonly config: ConfigService
  ) {}

  async getFileList() {
    let params = {
        Bucket: this.config.get('AWS_BUCKET_NAME'),
      };
    const data = await this.s3.listObjects(params).promise();
    console.log(data);
    return data.Contents;
  }

  async createFolder(email:string, path: string) {
    let params = {
        Bucket: this.config.get('AWS_BUCKET_NAME'),
        Key: email + path,
      };
    await this.s3.putObject(params).promise();
    return "";
  }

  async moveFolder(email:string, oldPath: string, newPath: string) {
    const bucketName = this.config.get('AWS_BUCKET_NAME');
    const folderToMove = email + oldPath;
    const destinationFolder = email + newPath;
    try {
        const listObjectsResponse = await this.s3.listObjects({
            Bucket: bucketName,
            Prefix: folderToMove,
            Delimiter: '/',
        }).promise();

        const folderContentInfo = listObjectsResponse.Contents;
        const folderPrefix = listObjectsResponse.Prefix;

        await Promise.all(
            folderContentInfo.map(async (fileInfo) => {
                await this.s3.copyObject({
                Bucket: bucketName,
                CopySource: `${bucketName}/${fileInfo.Key}`,
                Key: `${destinationFolder}/${fileInfo.Key.replace(folderPrefix, '')}`,
                }).promise();
            
                await this.s3.deleteObject({
                Bucket: bucketName,
                Key: fileInfo.Key,
                }).promise();
            })
            );
    } catch (err) {
    console.error(err); // error handling
    }
  }

  async deleteFolder(email:string, path: string) {
    const bucket = this.config.get('AWS_BUCKET_NAME');
    const listParams = {
        Bucket: bucket,
        Key: email + path,
    };

    const listedObjects = await this.s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    await this.s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await this.deleteFolder(bucket, email + path);
    }
}