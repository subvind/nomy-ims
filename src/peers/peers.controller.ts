import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';

@Controller('peers')
export class PeersController {
  constructor() {}

  @Get()
  @Render('peers/index')
  getPeers() {
    return { layout: false };
  }
}
