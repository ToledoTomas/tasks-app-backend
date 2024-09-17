import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3, { message: 'El titulo debe ser mayor a 3 caracteres' })
  title: string;

  @IsString()
  @MinLength(10, { message: 'La descripción debe ser mayor a 10 caracteres' })
  description: string;

  @IsNotEmpty()
  @IsEnum(['BACKLOG', 'PENDIENTE', 'COMPLETADO'])
  status: 'BACKLOG' | 'PENDIENTE' | 'COMPLETADO';

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;
}
