import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config'; // Import your TypeORM configuration file

import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ChannelModule,
    MessageModule,
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
