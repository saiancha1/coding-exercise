import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PurchaseOrdersController } from './purchase-orders.controllers';
import { PurchaseOrdersService } from './purchase-orders.service';

describe('PurchaseOrdersController', () => {
  let controller: PurchaseOrdersController;
  let service: PurchaseOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrdersController],
      providers: [
        {
          provide: PurchaseOrdersService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrdersController>(PurchaseOrdersController);
    service = module.get<PurchaseOrdersService>(PurchaseOrdersService);
  });

  describe('findAll', () => {
    it('should return an array of purchase orders', async () => {
      const expectedResult = [
        {
            id: 1, 
            vendor_name: 'Example Vendor', 
            order_date: new Date(), 
            expected_delivery_date: new Date(), 
            created_at: new Date(),
            updated_at: new Date() 
        },
        {
            id: 2, 
            vendor_name: 'Example Vendor 2', 
            order_date: new Date(), 
            expected_delivery_date: new Date(), 
            created_at: new Date(),
            updated_at: new Date() 
          }
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => expectedResult);
      expect(await controller.findAll()).toBe(expectedResult);
    });

    it('should throw an exception if an error occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());
      await expect(controller.findAll()).rejects.toThrow(new HttpException('Failed to fetch orders', HttpStatus.INTERNAL_SERVER_ERROR));
    });
  });

  describe('findById', () => {
    it('should return a purchase order if found', async () => {
        const expectedResult = {
            id: 1, 
            vendor_name: 'Example Vendor', 
            order_date: new Date(), 
            expected_delivery_date: new Date(), 
            created_at: new Date(),
            updated_at: new Date() 
          };
      jest.spyOn(service, 'findById').mockImplementation(async () => expectedResult);
      expect(await controller.findById('1')).toBe(expectedResult);
    });

    it('should throw an exception if orderId is invalid', async () => {
      await expect(controller.findById('invalid')).rejects.toThrow(new HttpException('Invalid order ID', HttpStatus.BAD_REQUEST));
    });
  });
});