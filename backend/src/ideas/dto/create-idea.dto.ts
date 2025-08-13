import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIdeaDto {
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  improvement: string;

  @IsString()
  @IsNotEmpty()
  currentProcess: string;

  @IsString()
  @IsNotEmpty()
  proposedChange: string;

  @IsString()
  @IsNotEmpty()
  expectedBenefit: string;

  toPrisma(): Prisma.IdeaCreateInput {
    return {
      authorId: this.authorId,
      improvement: this.improvement,
      currentProcess: this.currentProcess,
      proposedChange: this.proposedChange,
      expectedBenefit: this.expectedBenefit,
    } as Prisma.IdeaCreateInput;
  }
}
