import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { NEST_COUCH_OPTIONS } from './constants';
import { NestCouchAsyncOptions, NestCouchOptions, NestCouchOptionsFactory } from './interfaces';
import { bucketsFactory } from './nest-couch-buckets.provider';
import { connectionFactory } from './nest-couch-connection.provider';
import { defaultBucketFactory } from './nest-couch-defaultBucket.provider';
import { createNestCouchProviders } from './nest-couch.providers';
import { NestCouchService } from './nest-couch.service';

@Global()
@Module({
  providers: [NestCouchService, connectionFactory, defaultBucketFactory, bucketsFactory],
  exports: [NestCouchService, connectionFactory, defaultBucketFactory, bucketsFactory]
})
export class NestCouchModule {
  public static register(options: NestCouchOptions): DynamicModule {
    return {
      module: NestCouchModule,
      providers: createNestCouchProviders(options)
    };
  }

  public static registerAsync(options: NestCouchAsyncOptions): DynamicModule {
    return {
      module: NestCouchModule,
      providers: this.createAsyncProviders(options)
    };
  }

  private static createAsyncProviders(options: NestCouchAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
  }

  private static createAsyncOptionsProvider(options: NestCouchAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_COUCH_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: NEST_COUCH_OPTIONS,
      useFactory: async (optionsFactory: NestCouchOptionsFactory) => await optionsFactory.createNestCouchOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
