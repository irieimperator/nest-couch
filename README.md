<h1 align="center">nest-couch</h1>

<div align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" height="150" alt="Nest Logo" />
  </a>
  <a href="https://couchdb.apache.org/" target="_blank">
      <img src="https://couchdb.apache.org/image/couch@2x.png" width="150" height="150" alt="CouchDB Logo" />
    </a>
</div>

This module acts as a wrapper around [nano](https://github.com/apache/couchdb-nano) providing a convenient "NestJS style" approach for using [CouchDB](https://couchdb.apache.org/). 
nano is Apaches official NodeJS library with TypeScript support.

## Installation
`npm i @irieimperator/nest-couch`


## Configuration
### Options
Since it is a wrapper, you can use all options provided in nano.
To establish a connection, you need at least:

| parameter | type | required | description |
|-----------|------|----------|-------------|
| nano.url | string | true | url to connect to CouchDB, ex. `https://USER:PASSWORD@HOST:PORT` |

In addition, nest-couch accepts additional parameters:

| parameter | type | required | description |
|-----------|------|----------|-------------|
| defaultBucket | string | false | name of the default bucket you want to use |
| buckets | string[] | false | names of buckets you want to use |
| logging.level | 'OFF' or 'INFO' | false | controls level of logging |


### Import
This module can be imported and configured both synchronously and asynchronously. 

#### synchron
```typescript
NestCouchModule.register({
      nano: {
        url: 'https://USER:PASSWORD@HOST:PORT'
      },
      defaultBucket: 'cats',
      buckets: ['dogs', 'beavers', 'chinchillas'],
      logging: {
        level: 'INFO'
      }
})
```

#### asynchron
```typescript
NestCouchModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      nano: {
        url: configService.get<string>('DB_URL')
      },
      defaultBucket: configService.get<string>('DB_DEFAULT_BUCKET'),
      buckets: configService.get<string>('DB_BUCKETS').split(','),
      logging: {
        level: configService.get<'OFF' | 'INFO'>('DB_LOG_LEVEL')
      }
    };
  }
})
```

## Usage
Depending on the configuration you have access to the following:

| injected property | type | exists | description |
|-----------|------|----------|-------------|
| NEST_COUCH_CONNECTION | nano connection instance | always | / |
| NEST_COUCH_DEFAULT_BUCKET | nano.db.use(defaultBucket) | if specified | / |
| NEST_COUCH_BUCKETS | multiple nano.db.use(bucket) | if specified | returns an object holding a nano.db.use(bucket) for each specified bucket, with the bucket name as key  |


You can use nest-couch in a service like that:

```typescript
@Injectable()
export class AppService {
    constructor(
        @Inject(NEST_COUCH_CONNECTION) private readonly connection,
        @Inject(NEST_COUCH_DEFAULT_BUCKET) private readonly bucket,
        @Inject(NEST_COUCH_BUCKETS) private readonly buckets
    ) {}
    
    // use connection - create new bucket
    async createBucket(bucket: string) {
      await this.connection.db.create(bucket);
    }

    // use defaultBucket - list all objects
    async createBucket() {
      await this.bucket.list();
    }
    
    // use one of the other buckets - insert object
    async createBucket(bucket: string, object: MySpecialObject) {
      await this.buckets[bucket].insert(object);
    }
}
```

## Thanks
The basic structure of this module was created with [nestjsplus'](https://github.com/nestjsplus) [dynamic module generator](https://github.com/nestjsplus/dyn-schematics) - thanks for saving the effort, works like a charm!

