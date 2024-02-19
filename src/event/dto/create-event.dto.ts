import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsFuture', async: false })
export class IsFuture implements ValidatorConstraintInterface {
  validate(value: any) {
    return value > Date.now();
  }

  defaultMessage() {
    return 'startAt must be in the future';
  }
}

@ValidatorConstraint({ name: 'IsAfterStart', async: false })
export class IsAfterStart implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const startAt = (args.object as any).startAt;
    return value > startAt;
  }

  defaultMessage() {
    return 'endAt must be after startAt';
  }
}

export class CreateEventDto {
  @IsNotEmpty() @IsString() readonly title: string;

  @IsNotEmpty() @IsString() readonly description: string;

  @IsNotEmpty() @IsString() readonly location: string;

  @IsNotEmpty() @IsNumber() @Validate(IsFuture) readonly startAt: number;

  @IsNotEmpty() @IsNumber() @Validate(IsAfterStart) readonly endAt: number;

  @IsOptional() @IsBoolean() readonly isValid: boolean;
}
