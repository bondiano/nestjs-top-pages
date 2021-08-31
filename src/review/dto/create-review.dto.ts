import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDTO {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(1, { message: 'Рейтинг не может быть менее одного' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
