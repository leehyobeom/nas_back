import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { ConfigService} from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: 'nas',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];