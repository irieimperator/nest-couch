import { NEST_COUCH_BUCKETS } from './constants';
import { NestCouchService } from './nest-couch.service';

export const bucketsFactory = {
  provide: NEST_COUCH_BUCKETS,
  useFactory: async (nestCouchService) => {
    return nestCouchService.getBuckets();
  },
  inject: [NestCouchService]
};
