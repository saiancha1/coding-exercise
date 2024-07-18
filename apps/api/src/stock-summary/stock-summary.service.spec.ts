import { Test, TestingModule } from '@nestjs/testing';
import { StockSummaryService } from './stock-summary.service';
import { PrismaService } from '../prisma.service';

describe('StockSummaryService', () => {
    let service: StockSummaryService;
    let prismaService: PrismaService;
    const expectedResult = [  {
        "id": 1,
        "itemId": 1,
        "SOH": 7,
        "stockAvailable": 0,
        "branch_id": 1,
        "item": {
            "id": 1,
            "parent_item_id": 1,
            "name": "Red shirt",
            "sku": "sh-1",
            "price": "10",
            "quantity": 10,
            "created_at": null,
            "updated_at": null
        }
    },
    {
        "id": 2,
        "itemId": 2,
        "SOH": 60,
        "stockAvailable": 0,
        "branch_id": 1,
        "item": {
            "id": 2,
            "parent_item_id": 1,
            "name": "Blue shirt",
            "sku": "sh-2",
            "price": "10",
            "quantity": 10,
            "created_at": null,
            "updated_at": null
        }
    }]
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StockSummaryService,
                {
                    provide: PrismaService,
                    useValue: {
                        stockSummary: {
                            findMany: jest.fn(() => Promise.resolve(expectedResult)),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<StockSummaryService>(StockSummaryService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should return an array of stock summaries', async () => {
        const result = await service.findAll();
        expect(result).toEqual(expectedResult);
        expect(prismaService.stockSummary.findMany).toHaveBeenCalledWith({ include: { item: true } });
    });
});