import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class FindTopPageCategoryDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
