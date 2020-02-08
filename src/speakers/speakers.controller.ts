import { Controller } from '@nestjs/common';

@Controller('')
export class SpeakersController {

  getList() {
    return [
      { name: 'Amanda' },
      { name: 'Ben' }
    ]
  }
}
