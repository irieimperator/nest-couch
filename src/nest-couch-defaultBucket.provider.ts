import { NEST_COUCH_DEFAULT_BUCKET } from './constants';
import { NestCouchService } from './nest-couch.service';

export const defaultBucketFactory = {
  provide: NEST_COUCH_DEFAULT_BUCKET,
  useFactory: async (nestCouchService) => {
    return nestCouchService.getDefaultBucket();
  },
  inject: [NestCouchService]
};
