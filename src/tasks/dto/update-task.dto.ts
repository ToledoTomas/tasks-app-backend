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
  @IsAlphanumeric(null, { message: 'El titulo debe ser alfanumerico' })
  @MinLength(3, { message: 'El titulo debe ser mayor a 3 caracteres' })
  title?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'La descripción debe ser mayor a 10 caracteres' })
  @IsAlphanumeric(null, { message: 'La descripcion debe ser alfanumerica' })
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
  status?: string;
}
