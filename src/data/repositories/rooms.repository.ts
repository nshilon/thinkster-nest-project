import { Injectable } from '@nestjs/common';
import { RoomEntity } from '../room.entity';
import { BaseRepository } from './base.repository';
import { ParamsBase } from './models';

export interface RoomParams extends ParamsBase {
  name?: string;
  capacity?: number;
}

@Injectable()
export class RoomsRepository extends BaseRepository<RoomEntity, RoomParams> {

  constructor() {
    super('rooms');
  }

  protected queryData(db: RoomEntity[], params?: RoomParams) {
    if (params && params.name) {
      db = db.filter(x => x.name.toLowerCase().indexOf(params.name.toLowerCase()) > -1);
    }
    if(params && typeof params.capacity === 'number') {
      db = db.filter(x => x.capacity >= params.capacity)
    }
    return db;
  }

  protected mapEntity(entity: any) {
    const room = Object.assign(new RoomEntity(), entity, {
      createdAt: new Date(entity.createdAt)
    }) as RoomEntity;
    return room;
  }

}
