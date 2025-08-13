import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIdeaDto {
  @ApiProperty({ example: 'user-001', description: 'ID do autor da ideia' })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    example: 'Melhorar fluxo de atendimento',
    description: 'Descrição da melhoria proposta',
  })
  @IsString()
  @IsNotEmpty()
  improvement: string;

  @ApiProperty({
    example: 'Processo atual é manual',
    description: 'Como o processo funciona atualmente',
  })
  @IsString()
  @IsNotEmpty()
  currentProcess: string;

  @ApiProperty({
    example: 'Automatizar com chatbot',
    description: 'Mudança sugerida para o processo',
  })
  @IsString()
  @IsNotEmpty()
  proposedChange: string;

  @ApiProperty({
    example: 'Redução de tempo e erros',
    description: 'Benefício esperado com a mudança',
  })
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
