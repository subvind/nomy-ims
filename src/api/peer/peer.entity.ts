import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Channel } from '../channel/channel.entity';
import { Contact } from '../contact/contact.entity';
import { Tenant } from '../tenant/tenant.entity';

@Entity()
@Unique(['externalId']) 
export class Peer {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: '001', description: 'The id that is used to identify this peer externally' })
  @Column()
  externalId: string;

  // contact id
  @ManyToOne(() => Contact, contact => contact.id)
  contact: Contact;

  /**
   * Other properties and relationships as needed
   */

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
    console.log('oneTimePad insert', this.id)
  }
}
