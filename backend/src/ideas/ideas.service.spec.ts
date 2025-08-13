import { Test, TestingModule } from '@nestjs/testing';
import { IdeasService } from './ideas.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea } from '@prisma/client';

describe('IdeasService', () => {
  let service: IdeasService;

  const mockFindUnique = jest.fn();
  const mockUpdate = jest.fn();
  const mockCreate = jest.fn();
  const mockFindMany = jest.fn();
  const mockDelete = jest.fn();

  const mockPrismaService = {
    idea: {
      findUnique: mockFindUnique,
      update: mockUpdate,
      create: mockCreate,
      findMany: mockFindMany,
      delete: mockDelete,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeasService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<IdeasService>(IdeasService);

    // Reset mocks before each test to ensure test isolation
    mockFindUnique.mockReset();
    mockUpdate.mockReset();
    mockCreate.mockReset();
    mockFindMany.mockReset();
    mockDelete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should throw NotFoundException if idea not found', async () => {
      mockFindUnique.mockResolvedValue(null);

      const dto = new UpdateIdeaDto();
      dto.improvement = 'Nova melhoria';

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });

    it('should update and return the idea', async () => {
      const dto = new UpdateIdeaDto();
      dto.improvement = 'Nova melhoria';

      const existingIdea: Idea = {
        id: 1,
        authorId: 'user1',
        improvement: 'Antiga',
        currentProcess: 'Processo',
        proposedChange: 'Mudança',
        expectedBenefit: 'Benefício',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedIdea: Idea = {
        ...existingIdea,
        improvement: dto.improvement,
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(existingIdea);
      mockUpdate.mockResolvedValue(updatedIdea);

      const result = await service.update(1, dto);
      expect(result).toEqual(updatedIdea);
    });
  });

  describe('create', () => {
    it('should create and return a new idea', async () => {
      const dto = new CreateIdeaDto();
      dto.authorId = 'user1';
      dto.improvement = 'Melhoria';
      dto.currentProcess = 'Processo atual';
      dto.proposedChange = 'Mudança proposta';
      dto.expectedBenefit = 'Benefício esperado';

      const createdIdea = {
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.idea.create.mockResolvedValue(createdIdea);

      const result = await service.create(dto);
      expect(result).toEqual(createdIdea);
      expect(mockPrismaService.idea.create).toHaveBeenCalledWith({
        data: dto.toPrisma(),
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of ideas', async () => {
      const ideas = [
        {
          id: 1,
          authorId: 'user1',
          improvement: 'Melhoria 1',
          currentProcess: 'Processo 1',
          proposedChange: 'Mudança 1',
          expectedBenefit: 'Benefício 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          authorId: 'user2',
          improvement: 'Melhoria 2',
          currentProcess: 'Processo 2',
          proposedChange: 'Mudança 2',
          expectedBenefit: 'Benefício 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.idea.findMany.mockResolvedValue(ideas);

      const result = await service.findAll();
      expect(result).toEqual(ideas);
      expect(mockPrismaService.idea.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single idea if found', async () => {
      const idea: Idea = {
        id: 1,
        authorId: 'user1',
        improvement: 'Melhoria',
        currentProcess: 'Processo',
        proposedChange: 'Mudança',
        expectedBenefit: 'Benefício',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(idea);

      const result = await service.findOne(1);
      expect(result).toEqual(idea);
      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if idea not found', async () => {
      mockFindUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return the idea', async () => {
      const idea = {
        id: 1,
        authorId: 'user1',
        improvement: 'Melhoria',
        currentProcess: 'Processo',
        proposedChange: 'Mudança',
        expectedBenefit: 'Benefício',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.idea.findUnique.mockResolvedValue(idea);
      mockPrismaService.idea.delete.mockResolvedValue(idea);

      const result = await service.remove(1);
      expect(result).toEqual(idea);
      expect(mockPrismaService.idea.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if idea not found', async () => {
      mockPrismaService.idea.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('Negative Tests', () => {
    describe('update()', () => {
      it('should throw NotFoundException if idea does not exist', async () => {
        mockFindUnique.mockResolvedValue(null);

        const dto = new UpdateIdeaDto();
        dto.improvement = 'Updated improvement';

        await expect(service.update(999, dto)).rejects.toThrow(
          NotFoundException,
        );
      });

      it('should throw an error if update fails', async () => {
        const dto = new UpdateIdeaDto();
        dto.improvement = 'Updated improvement';

        mockFindUnique.mockResolvedValue({ id: 1 });
        mockUpdate.mockRejectedValue(new Error('Update failed'));

        await expect(service.update(1, dto)).rejects.toThrow('Update failed');
      });
    });

    describe('remove()', () => {
      it('should throw NotFoundException if idea does not exist', async () => {
        mockPrismaService.idea.findUnique.mockResolvedValue(null);

        await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      });

      it('should throw an error if delete fails', async () => {
        mockPrismaService.idea.findUnique.mockResolvedValue({ id: 1 });
        mockPrismaService.idea.delete.mockRejectedValue(
          new Error('Delete failed'),
        );

        await expect(service.remove(1)).rejects.toThrow('Delete failed');
      });
    });

    describe('create()', () => {
      it('should throw an error if database fails', async () => {
        const dto = new CreateIdeaDto();
        Object.assign(dto, {
          authorId: 'user1',
          improvement: 'Improvement',
          currentProcess: 'Current process',
          proposedChange: 'Proposed change',
          expectedBenefit: 'Expected benefit',
        });

        mockPrismaService.idea.create.mockRejectedValue(
          new Error('Database error'),
        );

        await expect(service.create(dto)).rejects.toThrow('Database error');
      });
    });
  });
});
