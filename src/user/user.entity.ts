import { Table, Column, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  company_name: string;
}