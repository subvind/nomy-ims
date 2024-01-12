import { Controller, Get, Render, Req, Query, Post, Body } from '@nestjs/common';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const port = process.env.PORT || 1337

@ApiTags('channels')
@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('channels/index')
  async getChannels() {
    return { 
      layout: false
    };
  }

  @Get('list-channels')
  @Render('channels/list-channels')
  async listChannels() {
    const params = {
      page: 1,
      limit: 10,
      search: '',
    };

    const payload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/channels`, { params }).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return { 
      layout: false,
      table: payload.data
    };
  }

  @Get('new-channel')
  @Render('channels/new-channel')
  newChannel() {
    return { layout: false };
  }

  @Post()
  @Render('channels/channel-created')
  async createChannel(
    @Req() req: Request,
    @Body() channelData: any
  ) {
    const payload = await firstValueFrom(
      this.httpService.post(
        `http://localhost:${port}/api/channels`, // url
        channelData // data
      ).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return {
      layout: false,
      created: payload.data
    }
  }

  @Get('table')
  @Render('channels/channels-table')
  async channelsTable(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const params = {
      page,
      limit,
      search,
    };

    const payload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/channels`, { params }).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return { 
      layout: false,
      table: payload.data
    };
  }
}
