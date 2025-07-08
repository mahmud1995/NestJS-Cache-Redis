import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @CacheKey('some_route')
  // @CacheTTL(30)
  // async getHello() {
  //   return this.appService.getCacheKey();
  // }
  @Post()
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    await this.appService.setCacheKey(key, value);
    return {
      success: true,
      status: 201,
      message: 'Key cached successfully',
    };
  }

  @Get('/get/:key')
  async getCacheKey(@Param('key') key: string) {
    const data = await this.appService.getCacheKey(key);
    return {
      success: true,
      status: 201,
      data,
    };
  }
}
