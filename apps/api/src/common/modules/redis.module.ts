import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { Env } from '@/common/utils';

export const REDIS_CLIENT = 'REDIS_CLIENT';

const redisProvider: Provider = {
  inject: [ConfigService],
  provide: REDIS_CLIENT,
  useFactory: async (configService: ConfigService<Env>) => {
    const client = createClient({
      password: configService.get('REDIS_PASSWORD'),
      url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
    });
    await client.connect();
    return client;
  },
};

@Global()
@Module({
  exports: [redisProvider],
  providers: [redisProvider],
})
export class RedisModule {}
