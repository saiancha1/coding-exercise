import {Module} from '@nestjs/common';
import {StockSummaryService} from './stock-summary.service';
import {StockSummaryController} from './stock-summary.controller';
import {PrismaService} from "../prisma.service";

@Module({
  imports: [],
  controllers: [StockSummaryController],
  providers: [StockSummaryService, PrismaService],
})
export class StockSummaryModule {
}
