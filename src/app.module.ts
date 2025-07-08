import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as redisStore from 'cache-manager-redis-store';
import { AppService } from './app.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      isGlobal: true,
    }),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    SocketGateway,
  ],
})
export class AppModule {}
