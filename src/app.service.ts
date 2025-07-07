import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    // SET
    await this.cacheManager.set('cached_item', { key: 32 }, 10); // .set('key', 'value', ttl)
    // await this.cacheManager.del('cached_item');
    // await this.cacheManager.clear();
    // GET
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log('cachedItem', cachedItem);
    return 'Hello World!';
  }
}
