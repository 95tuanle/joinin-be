export class CreateUserDto {
  readonly email: string;

  readonly password: string;

  readonly oauthProvider?: string;

  readonly oauthId?: string;

  readonly role?: 'user' | 'admin';
}
