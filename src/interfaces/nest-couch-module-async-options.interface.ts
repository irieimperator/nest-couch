/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { NestCouchOptionsFactory } from './nest-couch-options-factory.interface';
/* Interfaces */
import { NestCouchOptions } from './nest-couch-options.interface';

export interface NestCouchAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestCouchOptionsFactory>;
  useClass?: Type<NestCouchOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<NestCouchOptions> | NestCouchOptions;
}
