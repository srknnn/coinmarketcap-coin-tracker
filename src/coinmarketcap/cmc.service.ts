import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import axios from 'axios';
import { Coin } from '../models/coin.schema';
import moment from 'moment';
import * as _ from 'lodash';
import Table from 'cli-table3';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class CmcService {
  constructor(
    private readonly coinsService: CoinsService,
    private readonly telegramService: TelegramService,
  ) {}

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

  @Cron('30 6 * * *')
  async createDailyData() {
    const data: Coin[] = await this.getCryptocurrencies();
    for (let i = 0; i < data.length - 1; i++) {
      data[i].date_fetched = new Date();
      let ressponseCreate = await this.coinsService.create(data[i]);

      console.log('deneme', ressponseCreate);
    }
  }

  @Cron('30 6 * * *')
  async cleanOldData() {
    const today = moment();
    const twoMonthAgo = moment(today).subtract(2, 'month');
    this.coinsService.deleteOldDatas(twoMonthAgo);
  }

  async prepareTable(progress) {
    const headers = Object.keys(progress[0]);
    const colWidths = [7, 5, 5, 6];
    const table = new Table({ head: headers, colWidths });

    progress.forEach((row) => {
      const rowData = headers.map((header) => row[header]);
      table.push(rowData);
    });

    const message =
      `${moment(moment())
        .subtract(7, 'days')
        .format('DD-MM-YYYY')
        .toString()} ile ${moment()
        .format('DD-MM-YYYY')
        .toString()} Tarihleri arasında En çok aşama kaydeden 10 Coin \n` +
      '```\n' +
      table.toString() +
      '\n```';

    console.log(message);
    this.telegramService.sendTelegramMessage(message);
  }

  @Cron('30 6 * * *')
  async calculateProgress() {
    const today = moment();
    const aWeekAgo = moment(today).subtract(7, 'days');

    const coinsByDay = await this.coinsService.getCoinsByDay(today, aWeekAgo);

    const progress = _.chain(coinsByDay)
      .groupBy('symbol')
      .map((coins, symbol) => {
        const startRank = coins[0].rank;
        const endRank = coins[coins.length - 1].rank;
        const change = endRank - startRank;
        return {
          Coin: symbol,
          Başlangıç: startRank,
          Bitiş: endRank,
          Aşama: change,
        };
      })
      .orderBy('Aşama', 'desc')
      .slice(0, 10)
      .value();

    this.prepareTable(progress);
  }
}
