import { UseGuards } from '@nestjs/common';
import {
  HttpException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

import { JWTAuthGuard } from '../auth/guards/jwt.guard';

import { CreateReviewDTO } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDTO) {
    return this.reviewService.create(dto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
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
