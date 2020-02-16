import { Controller, Get, Param, Query } from '@nestjs/common';
import { SessionsRepository } from 'src/data/repositories/sessions.repository';

@Controller('sessions')
export class SessionsController {

  constructor(private sessionsRepository: SessionsRepository) {}

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.sessionsRepository.get(id);
  }

  @Get()
  getList(@Query('title') title: string) {
    return this.sessionsRepository.getAll({ title });
  }
}
