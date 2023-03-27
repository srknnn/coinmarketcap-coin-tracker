import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database.module';
import { CoinsModule } from '../coins/coins.module';
import { CoinSchema, Coin } from '../models/coin.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { CmcService } from '../coinmarketcap/cmc.service';
import { CoinsService } from '../coins/coins.service';

@Module({
  imports: [
    DatabaseModule,
    CoinsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }]),
    CoinsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CmcService, CoinsService],
})
export class AppModule {
  constructor(private readonly cmcService: CmcService) {
    this.cmcService.runCronJob();
  }
}
