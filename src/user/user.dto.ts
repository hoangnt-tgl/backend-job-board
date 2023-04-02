import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsEnum,
} from 'class-validator';

import { userRoles } from '../enums/role.enum';

import { ApiTags, ApiProperty } from '@nestjs/swagger';

@ApiTags('user')
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsEnum(userRoles, {
    message: 'role must be either freelance or company',
  })
  role: string;
}
