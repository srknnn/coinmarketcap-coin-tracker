import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig: MongooseModuleOptions = {
  uri: process.env.MONGO_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
