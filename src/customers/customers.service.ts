import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto} from './create-customer.dto'; 
import {UpdateCustomerDto} from './update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({ data: dto });
    } catch (err) {
      throw new ConflictException('Email or phone already exists');
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({ skip, take: limit }),
      this.prisma.customer.count(),
    ]);

    return {
      page,
      limit,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    try {
      return await this.prisma.customer.update({ where: { id }, data: dto });
    } catch {
      throw new ConflictException('Duplicate email or phone');
    }
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return this.prisma.customer.delete({ where: { id } });
  }
}
