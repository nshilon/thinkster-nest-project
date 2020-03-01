import { IsNumber, Min, IsString, IsNotEmpty } from 'class-validator';

export class RoomEntity {
  id: number;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be an empty string' })
  name: string;

  @IsNumber({}, { message: 'Capacity must be a number' })
  @Min(1, { message: 'Capacity must be greater than 0' })
  capacity: number;

  createdAt: Date = new Date();
  createdBy: string;
}
