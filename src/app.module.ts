import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SessionsRepository } from './data/repositories/sessions.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';
import { RoomsController } from './rooms/rooms.controller';
import { SpeakersController } from './speakers/speakers.controller';

@Module({
  imports: [],
  controllers: [AppController, RoomsController, SpeakersController],
  providers: [AppService, RoomsRepository, SpeakersRepository, SessionsRepository],
})
export class AppModule {}
