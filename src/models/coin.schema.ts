import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Coin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  num_market_pairs: number;

  @Prop({ required: true })
  date_added: Date;

  @Prop({ required: true })
  date_fetched: Date;

  @Prop({ required: false })
  max_supply: mongoose.Types.Decimal128;

  @Prop({ required: false })
  circulating_supply: mongoose.Types.Decimal128;

  @Prop({ required: true })
  total_supply: mongoose.Types.Decimal128;

  @Prop({ required: true })
  cmc_rank: number;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
