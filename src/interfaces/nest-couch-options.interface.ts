import { Configuration } from 'nano';

export interface NestCouchOptions {
  nano: Configuration;
  defaultBucket?: string;
  buckets?: string[];
  logging?: {
    level: 'OFF' | 'INFO';
  };
}
