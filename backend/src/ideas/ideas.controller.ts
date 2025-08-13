import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { IdeasService } from './ideas.service';

@ApiTags('ideas')
@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova ideia' })
  @ApiResponse({ status: 201, description: 'Ideia criada com sucesso' })
  create(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(createIdeaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as ideias' })
  findAll() {
    return this.ideasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ideia por ID' })
  findOne(@Param('id') id: number) {
    return this.ideasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar ideia existente' })
  update(@Param('id') id: number, @Body() updateIdeaDto: UpdateIdeaDto) {
    return this.ideasService.update(+id, updateIdeaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar ideia' })
  remove(@Param('id') id: number) {
    return this.ideasService.remove(+id);
  }
}
