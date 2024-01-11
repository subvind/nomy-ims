import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { PeersController } from './peers.controller';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
  ],
  exports: [
    
  ],
  controllers: [PeersController],
  providers: [],
})
export class PeersModule {}
