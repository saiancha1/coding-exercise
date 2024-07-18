import {Injectable} from '@nestjs/common';
import {PurchaseOrders} from "@prisma/client";
import {PrismaService} from "../prisma.service";

/**
  * Service for handling operations related to Purchase Orders.
  * It leverages the Prisma to interact with the database
  * and provides methods to find all purchase orders or a specific
  * purchase order by its ID. Each purchase order query includes
  * related purchase order line items.
*/
@Injectable()
export class PurchaseOrdersService {
  constructor(private prisma: PrismaService) {
  }

  /**
    * Retrieves all purchase orders from the database along with their
    * associated purchase order line items.
    * 
    * @returns A promise that resolves to an array of PurchaseOrders.
  */
  async findAll(): Promise<PurchaseOrders[]> {
    return this.prisma.purchaseOrders.findMany({include: {purchase_order_line_items: true}});
  }

  /**
    * Retrieves a specific purchase order by its ID from the database,
    * including its associated purchase order line items.
    * 
    * @param orderId The ID of the purchase order to find.
    * @returns A promise that resolves to the PurchaseOrders object if found.
  */
  async findById(orderId: number): Promise<PurchaseOrders> {
    return this.prisma.purchaseOrders.findUnique({
      where: { id: orderId },
      include: { purchase_order_line_items: true },
    });
  }
}
