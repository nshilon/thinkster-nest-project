import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { SpeakersRepository } from 'src/data/repositories/speakers.repository';
import { SpeakerEntity } from 'src/data/speaker.entity';

@Controller('speakers')
export class SpeakersController {

  constructor(private speakersRepository: SpeakersRepository) { }

  @Get(':id')
  get(@Param('id') idStr: string) {
    const id = parseInt(idStr, 10);
    return this.speakersRepository.get(id);
  }

  @Get()
  getList(@Query('name') name?: string, @Query('hasSpokenBefore') hasSpokenBeforeStr?: string) {
    let hasSpokenBefore: boolean;
    if (hasSpokenBeforeStr === 'true') {
      hasSpokenBefore = true;
    } else if (hasSpokenBeforeStr === 'false') {
      hasSpokenBefore = false;
    }
    return this.speakersRepository.getAll({ name, hasSpokenBefore });
  }

  @Post()
  create(@Body() speaker: unknown) {
    const speakerEntity = Object.assign(new SpeakerEntity(), speaker);
    speakerEntity.createdBy = 'admin';
    return this.speakersRepository.create(speakerEntity);
  }  

}
