import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index') // 'index' corresponds to the name of your view file without extension
  getIndex() {
    // You can add some data here if needed
    return {
      title: 'enigma machine'
    };
  }

  @Get('message')
  @Render('message')
  getMessage() {
    return {};
  }


  @Get('rotors')
  @Render('rotors')
  getRotors() {
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

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
