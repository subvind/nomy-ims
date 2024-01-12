import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Channel } from '../channel/channel.entity';
import { User } from '../user/user.entity';
import { Tenant } from '../tenant/tenant.entity';

export enum Status {
  ONLINE = 'Online', // this peer is online
  OFFLINE = 'Offline', // this peer is offline
}

@Entity()
export class Peer {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The display name of the peer' })
  @Column()
  displayName: string;

  @Column({ default: 'Offline' })
  status: Status; // status can be 'Online', 'Offline', etc.

  // user id
  @ManyToOne(() => User, user => user.id)
  user: User;

  /**
   * Other properties and relationships as needed
   */

  // sub organizations
  @ManyToMany(() => Channel, channel => channel.peers, { nullable: true })
  channels: Channel[]

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
    console.log('peer insert', this.id)
  }
}
