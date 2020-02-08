
export class SessionEntity {
  id: number;
  title: string;
  speakerId: number;
  abstract: string;
  time: string;
  roomId: number;
  createdAt: Date = new Date();
  createdBy = 'admin';
  level: string
}
