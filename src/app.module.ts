import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { SpeakersController } from './speakers/speakers.controller';
import { RoomsRepository } from './data/repositories/rooms.repository';
import { SpeakersRepository } from './data/repositories/speakers.repository';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsRepository } from './data/repositories/sessions.repository';

@Module({
  imports: [],
  controllers: [AppController, RoomsController, SpeakersController, SessionsController],
  providers: [
    AppService, 
    RoomsRepository, 
    SpeakersRepository, 
    SessionsRepository],
})
export class AppModule {}
