import { Controller, Get } from '@nestjs/common';
import { CmcService } from './../coinmarketcap/cmc.service';

@Controller('cmc')
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get()
  async getCryptocurrencies(): Promise<any> {
    return this.cmcService.getCryptocurrencies();
  }
}
