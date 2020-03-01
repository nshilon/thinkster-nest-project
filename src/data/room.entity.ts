import { IsNumber, IsDefined, Min, IsString, IsNotEmpty  } from 'class-validator';

export class RoomEntity {
  id: number;


  @IsDefined({
    message: 'Name is required'
  }) @IsString({
    message: 'Name must be a string'
  }) @IsNotEmpty({
    message: 'Name must not be an empty string'
  })
  name: string;

  @IsDefined({
    message: 'Capacity is required'
  }) @IsNumber({}, {
    message: 'Capacity must be a number'
  }) @Min(1, {
    message: 'Capacity must be greater than 0'
  })
  capacity: number;
  createdAt: Date = new Date();
  createdBy: string;
}
