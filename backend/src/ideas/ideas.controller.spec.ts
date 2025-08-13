import { Test, TestingModule } from '@nestjs/testing';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { Idea } from '@prisma/client';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

describe('IdeasController', () => {
  let controller: IdeasController;
  let service: IdeasService;

  const mockIdea: Idea = {
    id: 1,
    authorId: 'user1',
    improvement: 'Melhoria',
    currentProcess: 'Processo',
    proposedChange: 'Mudança',
    expectedBenefit: 'Benefício',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockIdea),
    findAll: jest.fn().mockResolvedValue([mockIdea]),
    findOne: jest.fn().mockResolvedValue(mockIdea),
    update: jest.fn().mockResolvedValue(mockIdea),
    remove: jest.fn().mockResolvedValue(mockIdea),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeasController],
      providers: [
        {
          provide: IdeasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<IdeasController>(IdeasController);
    service = module.get<IdeasService>(IdeasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO', async () => {
      const dto = new CreateIdeaDto();
      Object.assign(dto, mockIdea);

      const result = await controller.create(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockIdea);
    });
  });

  describe('findAll', () => {
    it('should return an array of ideas', async () => {
      const result = await controller.findAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockIdea]);
    });
  });

  describe('findOne', () => {
    it('should return a single idea by ID', async () => {
      const id = 1;
      const result = await controller.findOne(id);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockIdea);
    });
  });

  describe('update', () => {
    it('should update an idea by ID and return it', async () => {
      const id = 1;
      const dto: UpdateIdeaDto = {
        improvement: 'Melhoria',
        currentProcess: 'Processo',
        proposedChange: 'Mudança',
        expectedBenefit: 'Benefício',
        toPrismaUpdate: jest.fn().mockReturnValue({
          improvement: 'Melhoria',
          currentProcess: 'Processo',
          proposedChange: 'Mudança',
          expectedBenefit: 'Benefício',
        }),
      };

      Object.assign(dto, mockIdea);

      const result = await controller.update(id, dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockIdea);
    });
  });

  describe('remove', () => {
    it('should remove an idea by ID and return it', async () => {
      const id = 1;
      const result = await controller.remove(id);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockIdea);
    });
  });
});
