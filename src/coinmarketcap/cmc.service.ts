import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import axios from 'axios';
import { Coin } from '../models/coin.schema';
import moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class CmcService {
  constructor(private readonly coinsService: CoinsService) {}

  private readonly apiUrl =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=500';
  private readonly apiKey = process.env.CMC_APIKEY;

  async getCryptocurrencies(): Promise<Coin[]> {
    const response = await axios.get(this.apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': this.apiKey,
      },
    });
    return response.data.data;
  }

  async createDailyData() {
    const data: Coin[] = await this.getCryptocurrencies();
    for (let i = 0; i < data.length - 1; i++) {
      data[i].date_fetched = new Date('2023-03-22');
      // let ressponseCreate = await this.coinsService.create(data[i]);
      //
      // console.log('deneme', ressponseCreate);
    }
  }

  async calculateProgress() {
    const today = moment(new Date('2023-03-29'));
    const aWeekAgo = moment(today).subtract(7, 'days');

    const coinsByDay = await this.coinsService.getCoinsByDay(today, aWeekAgo);

    const progress = _.chain(coinsByDay)
      .groupBy('symbol')
      .map((coins, symbol) => {
        const startRank = coins[0].rank;
        const endRank = coins[coins.length - 1].rank;
        const change = endRank - startRank;
        return { symbol, startRank, endRank, progress: change };
      })
      .orderBy('progress', 'desc')
      .slice(0, 10)
      .value();
  }

  @Cron('* * * * *')
  async runCronJob() {
    // This function will be called every minute
    // const test = await this.coinsService.findAll();
    // console.log('Running cron job', test);
    console.log('Running cron job');
  }
}
