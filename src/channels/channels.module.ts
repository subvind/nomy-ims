import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { ChannelsController } from './channels.controller';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
  ],
  exports: [
    
  ],
  controllers: [ChannelsController],
  providers: [],
})
export class ChannelsModule {}
