import { Controller, Get } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Get()
  getList() {
    return this.speakersRepository.getAll();
  }
}
