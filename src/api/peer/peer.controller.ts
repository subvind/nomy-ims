import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { PeerService } from './peer.service';

import { Peer } from './peer.entity';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('peers')
@Controller('api/peers')
export class PeerController {
  constructor(
    private readonly peerService: PeerService
  ) {}

  @ApiOperation({ summary: 'Get all peers' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.peerService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a peer by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Peer> {
    const payload = await this.peerService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a peer by external id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('get/:externalId')
  async findSingle(
    @Req() req: Request,
    @Param('externalId') externalId: string,
  ): Promise<Peer> {
    const payload = await this.peerService.findByExternalId(externalId);
    
    return payload;
  }

  @ApiOperation({ summary: 'Create a peer' })
  @ApiBody({ type: Peer })
  @ApiResponse({ status: 201, description: 'Success', type: Peer })
  @Post()
  async create(
    @Req() req: Request,
    @Body() peerData: Peer
  ): Promise<Peer> {
    let payload: any;
    
    try {
      payload = await this.peerService.create(peerData);
      payload.error = false;
    } catch (e) {
      payload = e
      payload.error = true;
    }
    
    return payload;
  }

  @ApiOperation({ summary: 'Update a peer' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedPeerData: Peer
  ): Promise<Peer> {
    const payload = await this.peerService.update(id, updatedPeerData);
    
    return payload;
  }

  @ApiOperation({ summary: 'Delete a peer' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.peerService.remove(id);
    
    return payload;
  }
}
