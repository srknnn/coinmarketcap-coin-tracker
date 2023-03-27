import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import axios from 'axios';

@Injectable()
export class CmcService {
  constructor(private readonly coinsService: CoinsService) {}

  private readonly apiUrl =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
  private readonly apiKey = 'your-api-key-here';

  async getCryptocurrencies(): Promise<any> {
    const response = await axios.get(this.apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': this.apiKey,
      },
    });
    return response.data;
  }

  @Cron('* * * * *')
  async runCronJob() {
    // This function will be called every minute
    // const test = await this.coinsService.findAll();
    // console.log('Running cron job', test);
  }
}
