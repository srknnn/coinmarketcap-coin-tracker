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
import { TelegramService } from '../telegram/telegram.service';

@Module({
  imports: [
    DatabaseModule,
    CoinsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }]),
    CoinsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CmcService, CoinsService, TelegramService],
})
export class AppModule {
  constructor(
    private readonly cmcService: CmcService,
    private readonly telegramService: TelegramService,
  ) {
    this.cmcService.runCronJob();
    this.cmcService.createDailyData();
    this.cmcService.calculateProgress();
    this.telegramService.sendTelegramMessage({ serkan: 12 });
  }
}
