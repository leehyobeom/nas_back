import { User } from './user.entity';

export const userProviders = [
  {
    provide: 'User_REPOSITORY',
    useValue: User,
  },
];