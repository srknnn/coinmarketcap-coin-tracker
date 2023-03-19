import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CmcService {
  @Cron('* * * * *')
  runCronJob() {
    // This function will be called every minute
    console.log('Running cron job');
  }
}
