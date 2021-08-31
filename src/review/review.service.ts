import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ModelType<ReviewModel>,
  ) {}

  create(dto: CreateReviewDTO) {
    return this.reviewModel.create(dto);
  }

  delete(reviewId: string) {
    return this.reviewModel.findByIdAndDelete(reviewId).exec();
  }

  findByProductId(productId: string) {
    return this.reviewModel
      .find({ productId: Types.ObjectId(productId) })
      .exec();
  }

  deleteByProductId(productId: string) {
    return this.reviewModel
      .deleteMany({ productId: Types.ObjectId(productId) })
      .exec();
  }
}
