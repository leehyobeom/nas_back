import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('User_REPOSITORY')
    private userRepository: typeof User
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const result = await this.userRepository.findOne<User>({
      where:{
        email: email
      }
    });
    return result?.dataValues;
  }
}