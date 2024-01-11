import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config'; // Import your TypeORM configuration file
import { HttpModule } from '@nestjs/axios';

// api
import { ChannelModule } from './api/channel/channel.module';
import { ContactModule } from './api/contact/contact.module';
import { MessageModule } from './api/message/message.module';
import { PeerModule } from './api/peer/peer.module';
import { SessionModule } from './api/session/session.module';
import { TenantModule } from './api/tenant/tenant.module';
import { UserModule } from './api/user/user.module';

// frontend
import { AuthModule } from './auth/auth.module';
import { ChannelsModule } from './channels/channels.module';
import { MessagesModule } from './messages/messages.module';
import { PeersModule } from './peers/peers.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(config),
    // api
    ChannelModule,
    ContactModule,
    MessageModule,
    PeerModule,
    SessionModule,
    TenantModule,
    UserModule,

    // frontend
    AuthModule,
    ChannelsModule,
    MessagesModule,
    PeersModule,
    TenantsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
