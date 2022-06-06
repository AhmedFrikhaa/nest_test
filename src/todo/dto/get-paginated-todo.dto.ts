import { Optional } from '@nestjs/common';

export class GetPaginatedTodoDto {
  @Optional()
  page: number;
  @Optional()
  item: number;
}
