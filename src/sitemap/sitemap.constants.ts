import { TopLevelCategory } from '../top-page/top-page.model';

type RootMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: RootMapType = {
  [TopLevelCategory.Courses]: '/courses',
  [TopLevelCategory.Services]: '/services',
  [TopLevelCategory.Books]: '/books',
  [TopLevelCategory.Products]: '/products',
};
