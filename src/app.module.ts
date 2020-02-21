import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { SpeakersController } from './speakers/speakers.controller';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';

@Module({
  imports: [],
  controllers: [AppController, RoomsController, SpeakersController],
  providers: [AppService, RoomsRepository, SpeakersRepository],
})
export class AppModule {}
