import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'El titulo debe ser mayor a 3 caracteres' })
  title?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'La descripción debe ser mayor a 10 caracteres' })
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
  status?: string;
}
