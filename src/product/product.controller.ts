import {
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDTO } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JWTAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = this.productService.findById(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return product;
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = this.productService.deleteById(id);

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return deletedProduct;
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateProductDto,
  ) {
    const updatedProduct = this.productService.updateById(id, dto);

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDTO) {
    return this.productService.findWithReviews(dto);
  }
}
