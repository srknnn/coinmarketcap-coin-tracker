import { Controller, Get, Post, Body } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { Coin } from '../models/coin.schema';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  async findAll(): Promise<Coin[]> {
    return this.coinsService.findAll();
  }

  @Post()
  async create(@Body() createCoinDto: Coin): Promise<Coin> {
    console.log('denemeBody', createCoinDto);
    return this.coinsService.create(createCoinDto);
  }
}
