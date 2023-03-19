import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coins.service';
import { Coin, CoinSchema } from '../models/coin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {}
