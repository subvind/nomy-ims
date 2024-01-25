import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const port = process.env.PORT || 3000

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('index') // 'index' corresponds to the name of your view file without extension
  async getIndex() {
    return {
      title: 'Instant Messenger Software - nomy.IMS',
    };
  }

  @Get('instant-messenger')
  @Render('instant-messenger')
  getInstantMessenger() {
    return {
      title: 'Instant Messenger - nomy.IMS'
    };
  }

  @Get('message')
  @Render('message')
  getMessage() {
    return {};
  }

  @Post('broadcast')
  postData(@Req() req, @Res() res) {
    // Handle your POST request data
    const channel = req.body.channel || 'No channel received';

    // You can process the data here and send a response
    const response = `Received data: ${channel}`;

    // Send the response back
    res.send(response);
  }

  @Get('button')
  @Render('button')
  getButton() {
    return { layout: false };
  }

  @Get('init-session')
  @Render('init-session')
  initSession() {
    return { layout: false };
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
