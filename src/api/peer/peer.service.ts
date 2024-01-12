import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Peer } from './peer.entity';

@Injectable()
export class PeerService {
  constructor(
    @InjectRepository(Peer)
    private readonly peerRepository: Repository<Peer>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Peer[]; total: number }> {
    const query = this.peerRepository.createQueryBuilder('peer');
  
    if (search) {
      query.where(
        '(peer.displayName LIKE :search OR peer.externalId LIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    query.leftJoinAndSelect('peer.user', 'user');
    query.leftJoinAndSelect('peer.tenant', 'tenant');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Peer> {
    return this.peerRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        'user',
        'tenant'
      ]
    });
  }

  async create(peer: Peer): Promise<Peer> {
    const newObject = this.peerRepository.create(peer);
    return this.peerRepository.save(newObject);
  }

  async update(id: string, peer: Peer): Promise<Peer> {
    await this.peerRepository.update(id, peer);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.peerRepository.delete(id);
  }
}