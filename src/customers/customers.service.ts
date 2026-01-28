import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserRole } from '../users/dto/update-user.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // ADMIN only
  async create(dto: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({ data: dto });
    } catch (err) {
      if (err.code === 'P2002') throw new ConflictException('Email or phone already exists');
      throw err;
    }
  }

  async findAll(user, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, totalRecords] = await Promise.all([
      this.prisma.customer.findMany({ skip, take: limit }),
      this.prisma.customer.count(),
    ]);

    return {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data,
    };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    try {
      return await this.prisma.customer.update({ where: { id }, data: dto });
    } catch (err) {
      if (err.code === 'P2002') throw new ConflictException('Email or phone already exists');
      throw err;
    }
  }

  async remove(id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return this.prisma.customer.delete({ where: { id } });
  }
}
