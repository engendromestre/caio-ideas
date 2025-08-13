import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect on module init', async () => {
    service.$connect = jest.fn();
    await service.onModuleInit();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.$connect).toHaveBeenCalled();
  });

  it('should register shutdown hook', () => {
    const mockApp: Partial<INestApplication> = {
      close: jest.fn(),
    };

    const spy = jest.fn();
    service.$on = spy;

    service.enableShutdownHooks(mockApp as INestApplication);

    expect(spy).toHaveBeenCalledWith('beforeExit', expect.any(Function));
  });
});
