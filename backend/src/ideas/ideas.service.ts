import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Idea } from '@prisma/client';

@Injectable()
export class IdeasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIdeaDto: CreateIdeaDto): Promise<Idea> {
    return await this.prisma.idea.create({
      data: createIdeaDto.toPrisma(),
    });
  }

  async findAll(): Promise<Idea[]> {
    return await this.prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Idea> {
    const idea = await this.prisma.idea.findUnique({
      where: { id },
    });
    if (!idea) throw new NotFoundException(`Idea ${id} not found`);
    return idea;
  }

  async update(id: number, updateIdeaDto: UpdateIdeaDto): Promise<Idea> {
    const idea = await this.prisma.idea.findUnique({
      where: { id },
    });
    if (!idea) throw new NotFoundException(`Idea ${id} not found`);

    return await this.prisma.idea.update({
      where: { id },
      data: updateIdeaDto.toPrismaUpdate(),
    });
  }

  async remove(id: number): Promise<Idea> {
    const idea = await this.prisma.idea.findUnique({
      where: { id },
    });
    if (!idea) throw new NotFoundException(`Idea ${id} not found`);

    return await this.prisma.idea.delete({ where: { id } });
  }
}
