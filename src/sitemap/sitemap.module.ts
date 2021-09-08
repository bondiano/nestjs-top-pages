import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TopPageService } from 'src/top-page/top-page.service';
import { SitemapController } from './sitemap.controller';

@Module({
  controllers: [SitemapController],
  imports: [TopPageService, ConfigModule],
})
export class SitemapModule {}
