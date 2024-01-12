import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor() {}

  @Get()
  @Render('messages/index')
  getMessages() {
    return { layout: false };
  }
}
