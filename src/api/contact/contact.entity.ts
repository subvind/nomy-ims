import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Session } from '../session/session.entity';

@Entity()
@Unique(['emailAddress'])
@Unique(['phoneNumber'])
export class Contact {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'travis.burandt@gmail.com', description: 'The email address of the contact' })
  @Column()
  emailAddress: string;

  @ApiProperty({ example: '2817980497', description: 'The phone number of the contact' })
  @Column()
  phoneNumber: string;

  /**
   * Other properties and relationships as needed
   */

  // sessions
  @OneToMany(() => Session, session => session.contact, { nullable: true })
  sessions: Session[]

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
