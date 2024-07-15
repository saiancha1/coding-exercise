import {Controller, Get} from '@nestjs/common';
import {StockSummaryService} from './stock-summary.service';

@Controller('stock-summaries')
export class StockSummaryController {
  constructor(private readonly stockSummaryService: StockSummaryService) {
  }

  @Get()
  findAll() {
    return this.stockSummaryService.findAll();
  }
}