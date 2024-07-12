import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PrismaService } from '../prisma.service';

describe('PurchaseOrdersService', () => {
  let service: PurchaseOrdersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrdersService,
        {
          provide: PrismaService,
          useValue: {
            purchaseOrders: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrdersService>(PurchaseOrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of purchase orders', async () => {
      const expectedResponse = [];
      jest.spyOn(prismaService.purchaseOrders, 'findMany').mockResolvedValue(expectedResponse);
      const result = await service.findAll();
      expect(result).toBe(expectedResponse);
    });
  });

  describe('findById', () => {
    it('should return a purchase order if found', async () => {
      const orderId = 1;
      const expectedResponse = 
      {
        id: 1, 
        vendor_name: 'Example Vendor', 
        order_date: new Date(), 
        expected_delivery_date: new Date(), 
        created_at: new Date(),
        updated_at: new Date() 
    };
      jest.spyOn(prismaService.purchaseOrders, 'findUnique').mockResolvedValue(expectedResponse);
      const result = await service.findById(orderId);
      expect(result).toBe(expectedResponse);
    });

    it('should return null if no purchase order is found', async () => {
      const orderId = 999;
      jest.spyOn(prismaService.purchaseOrders, 'findUnique').mockResolvedValue(null);
      const result = await service.findById(orderId);
      expect(result).toBeNull();
    });
  });
});