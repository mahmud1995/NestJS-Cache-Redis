import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    // SET
    await this.cacheManager.set('cached_item', { key: 32 });
    // GET
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log('cachedItem', cachedItem);
    return 'Hello World!';
  }
}
