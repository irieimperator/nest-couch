import { Inject, Injectable, Logger } from '@nestjs/common';
import nano from 'nano';
import { NEST_COUCH_OPTIONS } from './constants';
import { NestCouchOptions } from './interfaces';

interface INestCouchService {
  getConnection(): Promise<any>;

  getDefaultBucket(): Promise<any>;

  getBuckets(): Promise<any>;
}

@Injectable()
export class NestCouchService implements INestCouchService {
  private readonly logger: Logger;
  private connection: any;
  private bucket: any;
  private buckets: any = {};

  constructor(@Inject(NEST_COUCH_OPTIONS) private nestCouchOptions: NestCouchOptions) {
    this.logger = new Logger('NestCouchService');
    this.logger.log(`NestCouchModule initialized`);

    switch (this.nestCouchOptions.logging.level) {
      case 'INFO': {
        this.logger.log(`Provided connection options: ${JSON.stringify(this.nestCouchOptions)}`);
      }
    }

    this.establishConnection();
  }

  establishConnection(): void {
    this.connection = nano(this.nestCouchOptions.nano);
  }

  async getConnection(): Promise<any> {
    return this.connection;
  }

  async getDefaultBucket(): Promise<any> {
    if (this.nestCouchOptions.defaultBucket !== undefined) {
      this.bucket = this.connection.db.use(this.nestCouchOptions.defaultBucket);
      return this.bucket;
    } else {
      return undefined;
    }
  }

  async getBuckets(): Promise<any[]> {
    const buckets = this.nestCouchOptions.buckets;
    if (buckets !== undefined && buckets.length > 0) {
      buckets.forEach((bucket) => {
        this.buckets[bucket] = this.connection.db.use(bucket);
      });
      return this.buckets;
    } else {
      return undefined;
    }
  }
}
