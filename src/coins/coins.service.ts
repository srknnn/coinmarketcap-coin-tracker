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

  async getCoinsByDay(
    today: moment.Moment,
    aWeekAgo: moment.Moment,
  ): Promise<any> {
    return this.coinModel
      .aggregate([
        {
          $match: {
            date_fetched: { $gte: aWeekAgo.toDate(), $lt: today.toDate() },
          },
        },
        {
          $group: {
            _id: {
              symbol: '$symbol',
              day: {
                $dateToString: { format: '%Y-%m-%d', date: '$date_fetched' },
              },
            },
            rank: { $avg: '$cmc_rank' },
          },
        },
        {
          $project: {
            _id: 0,
            symbol: '$_id.symbol',
            day: '$_id.day',
            rank: 1,
          },
        },
        {
          $sort: {
            symbol: 1,
            day: -1,
          },
        },
      ])
      .exec();
  }
}
