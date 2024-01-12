import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { User } from '../user/user.entity';

@Entity()
@Unique(['cookie'])
export class Session {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'ab132f38-7667-4be9-a2af-4c5d3ec0bff1', description: 'The ip address of the session' })
  @Column()
  cookie: string; // uuid generated client side kept in localstorage

  @ApiProperty({ example: '127.0.0.1', description: 'The ip address of the session' })
  @Column()
  ipAddress: string;

  @ApiProperty({ example: 'chrome', description: 'The user agent of the session' })
  @Column()
  userAgent: string;

  // user id
  @ManyToOne(() => User, user => user.id)
  user: User;

  /**
   * Other properties and relationships as needed
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = uuidv4();
    }
    console.log('session insert', this.id)
  }
}
