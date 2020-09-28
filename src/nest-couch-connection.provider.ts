import { NEST_COUCH_CONNECTION } from './constants';
import { NestCouchService } from './nest-couch.service';

export const connectionFactory = {
  provide: NEST_COUCH_CONNECTION,
  useFactory: async (nestCouchService) => {
    return nestCouchService.getConnection();
  },
  inject: [NestCouchService]
};
