import * as FileSync from 'lowdb/adapters/FileSync';
import * as lowdb from 'lowdb';
import { ConfAppDb, ParamsBase, QueryResult } from './models';
import { EntityNotFoundException } from './entity-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends { id: number; }> {
  protected db: lowdb.LowdbSync<ConfAppDb>;

  constructor(private entityName: string) {
    const adapter = new FileSync('./src/data/db.json', {
      defaultValue: defaultData
    });
    this.db = lowdb(adapter);
  }

  async getAll(params: ParamsBase = {}): Promise<QueryResult<T>> {
    let db = this.db.get(this.entityName);
    if (params.sort) {
      db = db.sortBy((item) => {
        if (params.sort in item) {
          if (typeof item[params.sort] === 'string') {
            return item[params.sort].toLowerCase();
          }
          return item[params.sort];
        }
        return item;
      });
    }

    db = this.queryData(db, params);

    const queryResult = new QueryResult<T>();
    const totalCount = db.value().length;
    Object.assign(queryResult, {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? totalCount,
      totalPages: Math.ceil(db.value().length / (params.pageSize ?? totalCount)),
      total: totalCount,
      sort: params.sort
    });

    if (params.page && params.pageSize) {
      db = db.slice((params.page - 1) * params.pageSize).take(params.pageSize);
    }

    const entities = db.value().map(x => {
      return this.mapEntity(x);
    });

    queryResult.data = entities;

    return queryResult;
  }

  // Overriden in sub class to provide specific query functionality
  protected abstract queryData(db: any, params: ParamsBase);

  // Overriden in sub class to map plain JS object to proper entity
  protected abstract mapEntity(entity: any);

  async get(id: number): Promise<T> {
    const dbRecord = await this.db
      .get(this.entityName)
      .find(x => x.id === id)
      .value();
    if (dbRecord) {
      return this.mapEntity(dbRecord);
    } else {
      throw new EntityNotFoundException(`${this.entityName} entity not found`);
    }
  }

  async create(entity: T) {
    const entities = await this.getAll();
    const maxId = Math.max(...entities.data.map(x => x.id));
    entity.id = maxId + 1;
    this.db
      .get(this.entityName)
      .push(entity)
      .write();
    return await entity;
  }

  async update(id: number, entity: T) {
    this.db
      .get(this.entityName)
      .find(x => (x.id as any) === id)
      .assign(entity)
      .write();
    return await entity;
  }

  async delete(id: number) {
    this.db
      .remove({ id })
      .write();
  }

}

const defaultData: ConfAppDb = {
  rooms: [
    {
      id: 1,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Grand Ballroom A',
      capacity: 100
    },
    {
      id: 2,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Grand Ballroom B',
      capacity: 120
    },
    {
      id: 3,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Vail',
      capacity: 40
    },
    {
      id: 4,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Breck',
      capacity: 65
    }
  ],
  sessions: [
    {
      id: 1,
      title: 'Always be Coding',
      speakerId: 1,
      abstract: 'Info about Always be Coding session',
      time: '2019-12-14T8:00Z',
      roomId: 1,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'intermediate'
    },
    {
      id: 2,
      title: 'Intro to Programming',
      speakerId: 2,
      abstract: 'Info about Intro to Programming session',
      time: '2019-12-14T8:00Z',
      roomId: 2,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'beginner'
    },
    {
      id: 3,
      title: 'Which Framework is Right for You?',
      speakerId: 3,
      abstract: 'Info about Which Framework is Right for You? session',
      time: '2019-12-14T8:00Z',
      roomId: 3,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'advanced'
    },
    {
      id: 4,
      title: 'Data Structures for Everyone',
      speakerId: 4,
      abstract: 'Info about Data Structures for Everyone session',
      time: '2019-12-14T8:00Z',
      roomId: 3,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'beginner'
    }
  ],
  speakers: [
    {
      id: 1,
      name: 'Abe Adams',
      bio: 'Abe is a dev',
      imgUrl: 'http://image.jpg',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: true
    },
    {
      id: 2,
      name: 'Vicky Vasquez',
      bio: 'Vicky is a dev',
      imgUrl: 'http://image.jpg',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: true
    },
    {
      id: 3,
      name: 'Charlie Cook',
      bio: 'Charlie is a dev',
      imgUrl: 'http://image.jpg',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: false
    },
    {
      id: 4,
      name: 'Maria Moore',
      bio: 'Maria is a dev',
      imgUrl: 'http://image.jpg',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: false
    }
  ]
};
