import {
  HttpException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';

import { CreateReviewDTO } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDTO) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async get(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
