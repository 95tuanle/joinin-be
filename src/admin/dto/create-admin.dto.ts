import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { Role } from '../../auth/enums/role.enum'

export class CreateAdminDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @ValidateIf((o) => !o.oauthProvider || !o.oauthId)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly firstName: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly lastName?: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
  readonly oauthProvider?: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
  readonly oauthId?: string

  @Equals(Role.Admin) readonly role?: Role.Admin
}
