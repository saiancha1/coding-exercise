import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ParentItemsModule} from "../parent-items/parent-items.module";
import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';
import { StockSummaryModule } from '../stock-summary/stock-summary.module';

@Module({
  imports: [
    ParentItemsModule,
    PurchaseOrdersModule,
    StockSummaryModule

  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
}
