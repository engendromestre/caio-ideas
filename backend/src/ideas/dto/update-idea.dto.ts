import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UpdateIdeaDto {
  @ApiProperty({
    example: 'user-001',
    description: 'ID do autor da ideia',
    required: false,
  })
  @IsString()
  @IsOptional()
  authorId?: string;

  @ApiProperty({
    example: 'Melhorar fluxo de atendimento',
    description: 'Descrição da melhoria proposta',
    required: false,
  })
  @IsString()
  @IsOptional()
  improvement?: string;

  @ApiProperty({
    example: 'Processo atual é manual',
    description: 'Como o processo funciona atualmente',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentProcess?: string;

  @ApiProperty({
    example: 'Automatizar com chatbot',
    description: 'Mudança sugerida para o processo',
    required: false,
  })
  @IsString()
  @IsOptional()
  proposedChange?: string;

  @ApiProperty({
    example: 'Redução de tempo e erros',
    description: 'Benefício esperado com a mudança',
    required: false,
  })
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
    };
  }
}
