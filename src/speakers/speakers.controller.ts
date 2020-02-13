import { Controller, Get } from '@nestjs/common';

@Controller('speakers')
export class SpeakersController {

  @Get()
  getList() {
    return [
      { name: 'Amanda' },
      { name: 'Ben' }
    ]
  }
}
