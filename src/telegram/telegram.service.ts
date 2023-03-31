import { Injectable } from '@nestjs/common';
import TelegramBot from 'telegram-bot-api';
import * as _ from 'lodash';

@Injectable()
export class TelegramService {
  private token = process.env.TELEGRAM_TOKEN;
  private chatId = process.env.TELEGRAM_CHANNELID;
  private bot = null;

  constructor() {
    this.bot = new TelegramBot({
      token: this.token,
    });
  }

  async sendTelegramMessage(data: any): Promise<void> {
    try {
      const message = `Here's the data from Nest.js: ${JSON.stringify(data)}`;
      await this.bot.sendMessage({
        chat_id: process.env.TELEGRAM_CHANNELID,
        text: message,
      });
    } catch (error) {
      console.error(
        'An error occurred while sending the Telegram message:',
        error,
      );
      throw error;
    }
  }
}
