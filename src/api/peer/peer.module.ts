import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { PeerController } from './peer.controller';
import { PeerService } from './peer.service';

import { Peer } from './peer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Peer]),
  ],
  exports: [
    PeerService
  ],
  controllers: [PeerController],
  providers: [PeerService],
})
export class PeerModule {}
