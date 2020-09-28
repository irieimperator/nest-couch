import { NestCouchOptions } from './nest-couch-options.interface';

export interface NestCouchOptionsFactory {
  createNestCouchOptions(): Promise<NestCouchOptions> | NestCouchOptions;
}
