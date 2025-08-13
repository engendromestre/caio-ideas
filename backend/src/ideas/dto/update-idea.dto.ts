import { IsString, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class UpdateIdeaDto {
  @IsString()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  improvement?: string;

  @IsString()
  @IsOptional()
  currentProcess?: string;

  @IsString()
  @IsOptional()
  proposedChange?: string;

  @IsString()
  @IsOptional()
  expectedBenefit?: string;

  toPrismaUpdate(): Prisma.IdeaUpdateInput {
    return {
      authorId: this.authorId,
      improvement: this.improvement,
      currentProcess: this.currentProcess,
      proposedChange: this.proposedChange,
      expectedBenefit: this.expectedBenefit,
    } as Prisma.IdeaUpdateInput;
  }
}
