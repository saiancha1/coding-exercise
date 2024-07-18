import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StockSummaryService } from './stock-summary.service';
import { StockSummary } from '@prisma/client';

/**
 * Controller responsible for handling stock summary related requests.
 */
@Controller('stock-summaries')
export class StockSummaryController {
  constructor(private readonly stockSummaryService: StockSummaryService) {}

  /**
   * Retrieves all stock summaries.
   * @returns {Promise<StockSummary[]>} A promise that resolves to an array of stock summaries.
   */
  @Get()
  findAll(): Promise<StockSummary[]> {
    try
    {
      return this.stockSummaryService.findAll();
    } 
    catch (error) 
    {
      throw new HttpException(
        'Error retreiving stock summaries',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
