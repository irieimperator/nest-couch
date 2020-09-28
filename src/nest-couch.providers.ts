import { NEST_COUCH_OPTIONS } from './constants';
import { NestCouchOptions } from './interfaces';

export function createNestCouchProviders(options: NestCouchOptions) {
  return [
    {
      provide: NEST_COUCH_OPTIONS,
      useValue: options
    }
  ];
}
