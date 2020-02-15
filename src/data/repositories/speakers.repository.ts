import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { ParamsBase } from './models';
import { SpeakerEntity } from '../speaker.entity';

export interface SpeakerParams extends ParamsBase {
  name?: string;
  hasSpokenBefore?: boolean;
}

@Injectable()
export class SpeakersRepository extends BaseRepository<SpeakerEntity, SpeakerParams> {

  constructor() {
    super('speakers');
  }

  protected queryData(db: SpeakerEntity[], params?: SpeakerParams) {
    if (params && params.name) {
      db = db.filter(x => x.name.toLowerCase().indexOf(params.name.toLowerCase()) > -1);
    }
    if (params && typeof params.hasSpokenBefore === 'boolean') {
      db = db.filter(x => x.hasSpokeBefore === params.hasSpokenBefore);
    }
    return db;
  }

  protected mapEntity(entity: any) {
    const speaker = Object.assign(new SpeakerEntity(), entity, {
      createdAt: new Date(entity.createdAt)
    }) as SpeakerEntity;
    return speaker;
  }

}
