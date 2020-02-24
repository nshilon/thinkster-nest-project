import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SessionsRepository } from './data/repositories/sessions.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RoomsRepository, SpeakersRepository, SessionsRepository],
})
export class AppModule {}
