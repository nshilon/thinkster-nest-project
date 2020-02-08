export class SpeakerEntity {
  id: number;
  name: string;
  bio: string;
  imgUrl: string;
  hasSpokeBefore: boolean;
  createdAt: Date = new Date();
  createdBy = 'admin';
}
