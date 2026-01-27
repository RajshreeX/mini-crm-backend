import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private service: CustomersService) {}

  @Post()
  @UseGuards(new RolesGuard('ADMIN'))
  create(@Body() dto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(new RolesGuard('ADMIN'))
  update(@Param('id') id: number, @Body() dto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(new RolesGuard('ADMIN'))
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
