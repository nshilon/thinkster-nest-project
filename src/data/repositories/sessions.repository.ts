import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { ParamsBase } from './models';
import { SessionEntity } from '../session.entity';

export interface SessionParams extends ParamsBase {
  title?: string;
  level?: string;
}

@Injectable()
export class SessionsRepository extends BaseRepository<SessionEntity, SessionParams> {

  constructor() {
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

  protected validateEntity(entity: SessionEntity) {
    const errors = super.validateEntity(entity);
    if(typeof entity.title !== 'string' || entity.title.length === 0) {
      errors.push('Title is required and cannot be empty');
    }
    if(typeof entity.speakerId !== 'number' || entity.speakerId <= 0) {
      errors.push('SpeakerId is required');
    }
    if(typeof entity.roomId !== 'number' || entity.roomId <= 0) {
      errors.push('RoomId is required');
    }
    if(typeof entity.time !== 'object' || typeof entity.time.getMonth !== 'function') {
      errors.push('CreatedAt is required and must be a date');
    }
    if(typeof entity.level !== 'string' || (entity.level !== 'beginner' && entity.level !== 'advanced' && entity.level !== 'intermediate')) {
      errors.push('Level is required and must be beginner, intermediate, or advanced');
    }
    return errors;
  }
}
