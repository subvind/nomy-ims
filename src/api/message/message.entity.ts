import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';
import { Tenant } from '../tenant/tenant.entity';

@Entity()
// @Unique(['session', 'channel'])
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Hello World!', description: 'The plain text of the message' })
  @Column()
  text: string;

  /**
   * Other properties and relationships as needed
   */

  // user id
  @ManyToOne(() => User, user => user.id)
  user: User;

  // channel id
  @ManyToOne(() => Channel, channel => channel.id)
  channel: Channel;

  // tenant id
  @ManyToOne(() => Tenant, tenant => tenant.id)
  tenant: Tenant;
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = uuidv4();
    }
    console.log('message insert', this.id)
  }
}
