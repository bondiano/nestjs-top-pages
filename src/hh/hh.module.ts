import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TopPageModule } from '../top-page/top-page.module';

import { HhService } from './hh.service';

@Module({
  providers: [HhService],
  imports: [ConfigModule, HttpModule],
  exports: [HhService],
})
export class HhModule {}
