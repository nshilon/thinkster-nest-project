import { Controller, Get, Param } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.speakersRepository.get(id);
  }

  @Get()
  getList() {
    return this.speakersRepository.getAll();
  }
}
