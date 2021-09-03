import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';

import { IdValidationPipe } from '../pipes/id-validation.pipe';

import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageCategoryDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JWTAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = this.topPageService.findById(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @Get(':alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = this.topPageService.findByAlias(alias);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = this.topPageService.deleteById(id);

    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return deletedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const updatedTopPage = this.topPageService.updateById(id, dto);

    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageCategoryDto) {
    return this.topPageService.findByCategory(dto);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
