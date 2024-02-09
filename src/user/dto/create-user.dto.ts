import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string;

  @ValidateIf((o) => !o.oauthProvider || !o.oauthId)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
  readonly oauthProvider?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
  readonly oauthId?: string;

  @IsOptional() @Equals('user') readonly role?: 'user';
}
