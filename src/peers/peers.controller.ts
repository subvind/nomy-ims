import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('peers')
@Controller('peers')
export class PeersController {
  constructor() {}

  @Get()
  @Render('peers/index')
  getPeers() {
    return { layout: false };
  }
}
