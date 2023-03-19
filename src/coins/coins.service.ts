import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coin } from '../models/coin.schema';

@Injectable()
export class CoinsService {
  constructor(@InjectModel(Coin.name) private coinModel: Model<Coin>) {}

  async findAll(): Promise<Coin[]> {
    return this.coinModel.find().exec();
  }

  async create(createCoinDto: Coin): Promise<Coin> {
    const createdCat = new this.coinModel(createCoinDto);
    return createdCat.save();
  }
}
