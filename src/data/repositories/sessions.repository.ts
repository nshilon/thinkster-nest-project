import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { ParamsBase } from './models';
import { SessionEntity } from '../session.entity';
import { RoomsRepository } from './rooms.repository';
import { SpeakersRepository } from './speakers.repository';
import { EntityNotFoundException } from './entity-not-found.exception';

export interface SessionParams extends ParamsBase {
  title?: string;
  level?: string;
}

@Injectable()
export class SessionsRepository extends BaseRepository<SessionEntity, SessionParams> {

  constructor(private roomsRepository: RoomsRepository, private speakersRepository: SpeakersRepository) {
    super('sessions');
  }

  protected queryData(db: SessionEntity[], params?: SessionParams) {
    if (params && params.title) {
      db = db.filter(x => x.title.toLowerCase().indexOf(params.title.toLowerCase()) > -1);
    }
    if(params && params.level) {
      db = db.filter(x => x.level.toLowerCase().indexOf(params.level.toLowerCase()) > -1);
    }
    return db;
  }

  protected mapEntity(entity: any) {
    const session = Object.assign(new SessionEntity(), entity, {
      createdAt: new Date(entity.createdAt)
    }) as SessionEntity;
    return session;
  }

  protected async validateEntity(entity: SessionEntity) {
    const errors = await super.validateEntity(entity);
    if(typeof entity.title !== 'string' || entity.title.length === 0) {
      errors.push('Title is required and cannot be empty');
    }
    if(typeof entity.speakerId !== 'number' || entity.speakerId <= 0) {
      errors.push('SpeakerId is required');
    }
    if(typeof entity.roomId !== 'number' || entity.roomId <= 0) {
      errors.push('RoomId is required');
    }
    try {
      await this.speakersRepository.get(entity.roomId);
    } catch(ex) {
      if(ex instanceof EntityNotFoundException) {
        errors.push(`roomId ${entity.roomId} does not exist in table rooms`)
      }
    }
    try {
      await this.speakersRepository.get(entity.speakerId);
    } catch(ex) {
      if(ex instanceof EntityNotFoundException) {
        errors.push(`speakerId ${entity.speakerId} does not exist in table speakers`)
      }
    }
    return errors;
  }
}
