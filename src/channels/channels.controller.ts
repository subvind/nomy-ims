import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';

@Controller('channels')
export class ChannelsController {
  constructor() {}

  @Get()
  @Render('channels/index')
  getChannels() {
    return { layout: false };
  }
}
