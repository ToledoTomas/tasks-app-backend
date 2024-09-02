import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres'})
  password: string;
}
