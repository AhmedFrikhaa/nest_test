import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/addTodoDto';
import { TodoService } from './todo.service';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion.pipe';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Query() mesQueryParams: GetPaginatedTodoDto): Todo[] {
    console.log(mesQueryParams);
    return this.todoService.getTodos();
  }
  @Get('/:id')
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.getTodoById(id);
  }
  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    console.log('afficher liste des todo');
    response.status(200);
    response.json({ content: 'afficher la liste des Todos V2' });
  }
  @Post()
  addTodos(@Body() newTodo: AddTodoDto) {
    this.todoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodos(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  updateTodos(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id,
    @Body() newTodo: Partial<AddTodoDto>,
  ) {
    return this.todoService.updateTodo(id, newTodo);
  }
  @Post('pipe')
  testPipe(@Body() data, @Param('data ', UpperAndFusionPipe) parmData) {
    return data;
  }
}
