import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { CoinsModule } from './coins/coins.module';
import { CoinSchema } from './models/coin.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { CmcService } from './coinmarketcap/CmcService';

@Module({
  imports: [
    DatabaseModule,
    CoinsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Cat', schema: CoinSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, CmcService],
})
export class AppModule {
  constructor(private readonly cmcService: CmcService) {
    this.cmcService.runCronJob();
  }
}
