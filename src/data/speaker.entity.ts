import { IsDefined, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// Exercise:
// branch: exercise-validators
// Add decorators from class-validator to make sure that:
// 1) There is a value provided for name, that it is a string, and it is not empty
// 2) There is a value provided for hasSpokeBefore, and that it is a boolean
// 3) IF there is a value passed in for bio, make sure its a non-empty string (hint: you will need a new decorator not discussed yet)
// Run POST and PUT requests to /speakers, /speakers/:id to make sure the validation logic is working properly

export class SpeakerEntity {
  id: number;
  @IsDefined() @IsString() @IsNotEmpty()
  name: string;
  bio?: string;
  @IsDefined() @IsBoolean()
  hasSpokeBefore: boolean;
  createdAt: Date = new Date();
  createdBy: string;
}
