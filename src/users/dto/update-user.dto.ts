import { IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export class UpdateUserDto {
  @IsEnum(UserRole)
  role: UserRole;
}
