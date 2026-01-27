import { Controller, Post, Get, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  @UseGuards(new RolesGuard('ADMIN'))
  create(@Body() dto) {
    return this.service.create(dto);
  }

  @Get()
  getTasks(@Req() req) {
    return this.service.findAll(req.user);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() body, @Req() req) {
    return this.service.updateStatus(+id, body.status, req.user);
  }
}
