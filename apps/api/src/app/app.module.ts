import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ParentItemsModule} from "../parent-items/parent-items.module";
import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';
import { StockSummaryModule } from '../stock-summary/stock-summary.module';
import { BranchModule } from '../branches/branch.module';
import { AdjustmentModule } from '../adjustments/adjustment.module';

@Module({
  imports: [
    ParentItemsModule,
    PurchaseOrdersModule,
    StockSummaryModule,
    BranchModule,
    AdjustmentModule

  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
}
