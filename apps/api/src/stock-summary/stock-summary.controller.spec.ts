import { Test, TestingModule } from '@nestjs/testing';
import { StockSummaryController } from './stock-summary.controller';
import { StockSummaryService } from './stock-summary.service';

describe('StockSummaryController', () => {
    let controller: StockSummaryController;
    let service: StockSummaryService;
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
    }];
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [StockSummaryController],
        providers: [
        {
            provide: StockSummaryService,
            useValue: {
                findAll: jest.fn(() => Promise.resolve(expectedResult)),
            },
        },
      ],
    }).compile();

    controller = module.get<StockSummaryController>(StockSummaryController);
    service = module.get<StockSummaryService>(StockSummaryService);
});

  it('should call findAll on the service and return the result', async () => {
    expect(await controller.findAll()).toEqual(expectedResult);
    expect(service.findAll).toHaveBeenCalled();
  });
});