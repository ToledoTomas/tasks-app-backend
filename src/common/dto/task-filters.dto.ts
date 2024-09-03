import { IsIn, IsOptional } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsIn(['BACKLOG', 'PENDIENTE', 'COMPLETADO'])
  status?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDirection?: 'ASC' | 'DESC';
}
