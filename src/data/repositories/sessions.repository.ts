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
}
