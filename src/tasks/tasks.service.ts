import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    // check assigned employee exists
    const user = await this.prisma.user.findUnique({ where: { id: dto.assignedTo } });
    if (!user || user.role !== 'EMPLOYEE') throw new NotFoundException('Employee not found');

    // check customer exists
    const customer = await this.prisma.customer.findUnique({ where: { id: dto.customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status || TaskStatus.PENDING,
        assignedToId: dto.assignedTo,
        customerId: dto.customerId,
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }

  async findAll(user) {
    if (user.role === 'ADMIN') {
      return this.prisma.task.findMany({
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          customer: { select: { id: true, name: true, email: true, phone: true } },
        },
      });
    }

    return this.prisma.task.findMany({
      where: { assignedToId: user.userId },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }

  async updateStatus(id: number, dto: UpdateTaskStatusDto, user) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    if (user.role === 'EMPLOYEE' && task.assignedToId !== user.userId) {
      throw new ForbiddenException('Cannot update others task');
    }

    return this.prisma.task.update({
      where: { id },
      data: { status: dto.status },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }
}
