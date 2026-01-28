import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/dto/auth.dto';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export class UpdateUserDto {
   @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}
