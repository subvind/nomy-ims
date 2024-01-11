import { Controller, Get, Render, Req, Res, Post, Body } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const port = process.env.PORT || 1337

@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('users/index')
  getUsers() {
    return { layout: false };
  }
}
