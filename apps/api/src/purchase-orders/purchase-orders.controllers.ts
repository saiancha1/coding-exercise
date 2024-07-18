import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {PurchaseOrdersService} from './purchase-orders.service';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrderService: PurchaseOrdersService) {
  }
  /**
    * Retrieves all purchase orders.
    * 
    * This method fetches a list of all purchase orders from the database using the `purchaseOrderService`.
    * If successful, it returns the list of purchase orders. In case of any error during the fetch operation,
    * it throws an HTTP exception with a status of INTERNAL_SERVER_ERROR, indicating a failure to fetch the orders.
    * 
    * @returns {Promise<PurchaseOrder[]>} A promise that resolves to an array of purchase order objects.
    * @throws {HttpException} Throws an `Failed to fetch orders` exception if an error occurs during the fetch operation.
  */
  @Get()
  async findAll() {
    try {
      return await this.purchaseOrderService.findAll();
    } catch (error) { 
      throw new HttpException('Failed to fetch orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
    * Retrieves a purchase order by its ID.
    * 
    * This method attempts to find a single purchase order based on the provided `orderId`.
    * If the order is found, it is returned; otherwise, an HTTP exception is thrown indicating
    * that the order was not found.
    * 
    * @param {number} orderId - The ID of the purchase order to retrieve.
    * @returns {Promise<PurchaseOrder>} A promise that resolves to the found purchase order.
    * @throws {HttpException} Throws an `Order not found` exception if no order matches the given ID.
    * @throws {HttpException} Throws a `Failed to fetch order` exception if any other error occurs.
  */
  @Get(':orderId')
  async findById(@Param('orderId') orderId: string){
    try{
      const parsedOrderId = parseInt(orderId);
      if (isNaN(parsedOrderId)) { 
        throw new HttpException('Invalid order ID', HttpStatus.BAD_REQUEST);
      }
      const order = await this.purchaseOrderService.findById(parsedOrderId);
      if(!order){
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}