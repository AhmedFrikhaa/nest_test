import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    console.log('afficher liste des todo');
    return 'afficher la liste des Todos';
  }
  @Get('v2')
  getTodosV2(@Req() request: Request,@Res() response: Response) {
    console.log('afficher liste des todo');
    response.status(200);
    response.json({ content: 'afficher la liste des Todos V2' });
  }
  @Post()
  addTodos() {
    console.log('ajouter a la liste des Todos');
    return 'Add Todos';
  }

  @Delete()
  deleteTodos() {
    console.log('supprimer un element des Todos');
    return 'Delete un Todos';
  }

  @Put()
  updateTodos() {
    console.log('update un element des Todos');
    return 'Update un Todos';
  }
}
