export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly oauthProvider?: string;
  readonly oauthId?: string;
  readonly role?: 'user'; // TODO: VALIDATIONS
}
