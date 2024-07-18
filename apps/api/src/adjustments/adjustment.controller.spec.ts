import { Test, TestingModule } from '@nestjs/testing';
import { AdjustmentController } from './adjustment.controller';
import { AdjustmentService } from './adjustment.service';
import { HttpException } from '@nestjs/common';

describe('AdjustmentController', () => {
  let controller: AdjustmentController;
  let service: AdjustmentService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdjustmentController],
      providers: [
        {
          provide: AdjustmentService,
          useValue: {
            getAllAdjustments: jest.fn().mockResolvedValue([ {
                "id": 1,
                "created_at": "2024-07-16T09:26:15.296Z",
                "branch_id": 1,
                "adjustment_line_items": [
                    {
                        "id": 1,
                        "adjustment_id": 1,
                        "item_id": 1,
                        "quantity": 2,
                        "cost": "3",
                        "created_at": null
                    }
                ]
            },
            {
                "id": 2,
                "created_at": null,
                "branch_id": 1,
                "adjustment_line_items": [
                    {
                        "id": 2,
                        "adjustment_id": 2,
                        "item_id": 1,
                        "quantity": 2,
                        "cost": "3",
                        "created_at": null
                    }
                ]
            }]),
            getAdjustmentById: jest.fn().mockImplementation((id) => 
              id === 1 ? Promise.resolve( {
                "id": 1,
                "created_at": "2024-07-16T09:26:15.296Z",
                "branch_id": 1,
                "adjustment_line_items": [
                    {
                        "id": 1,
                        "adjustment_id": 1,
                        "item_id": 1,
                        "quantity": 2,
                        "cost": "3",
                        "created_at": null
                    }
                ]
            }) : null
            ),
            createAdjustment: jest.fn().mockResolvedValue({
                "id": 24,
                "created_at": "2024-07-18T10:47:05.821Z",
                "branch_id": 2,
                "adjustment_line_items": [
                    {
                        "id": 24,
                        "adjustment_id": 24,
                        "item_id": 6,
                        "quantity": 5,
                        "cost": 6.78,
                        "created_at": "2024-07-18T10:47:05.821Z"
                    }
                ]
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AdjustmentController>(AdjustmentController);
    service = module.get<AdjustmentService>(AdjustmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllAdjustments', () => {
    it('should return an array of adjustments', async () => {
      await expect(controller.getAllAdjustments()).resolves.toEqual([{
        "id": 1,
        "created_at": "2024-07-16T09:26:15.296Z",
        "branch_id": 1,
        "adjustment_line_items": [
            {
                "id": 1,
                "adjustment_id": 1,
                "item_id": 1,
                "quantity": 2,
                "cost": "3",
                "created_at": null
            }
        ]
    },
    {
        "id": 2,
        "created_at": null,
        "branch_id": 1,
        "adjustment_line_items": [
            {
                "id": 2,
                "adjustment_id": 2,
                "item_id": 1,
                "quantity": 2,
                "cost": "3",
                "created_at": null
            }
        ]
    }]);
      expect(service.getAllAdjustments).toHaveBeenCalled();
    });
  });

  describe('getAdjustmentById', () => {
    it('should return an adjustment by ID', async () => {
      await expect(controller.getAdjustmentById('1')).resolves.toEqual({
        "id": 1,
        "created_at": "2024-07-16T09:26:15.296Z",
        "branch_id": 1,
        "adjustment_line_items": [
            {
                "id": 1,
                "adjustment_id": 1,
                "item_id": 1,
                "quantity": 2,
                "cost": "3",
                "created_at": null
            }
        ]
    });
      expect(service.getAdjustmentById).toHaveBeenCalledWith(1);
    });

    it('should throw an exception for invalid ID', async () => {
      await expect(controller.getAdjustmentById('invalid')).rejects.toThrow(HttpException);
    });
  });

  describe('createAdjustment', () => {
    it('should create and return an adjustment', async () => {
      const newAdjustment = {
        "branch_id": 2,
        "adjustment_line_items": {
            "create": [
                {
                    "item_id": 6,
                    "quantity": 5,
                    "cost": 6.78
                }
            ]
        }
    };
      await expect(controller.createAdjustment(newAdjustment)).resolves.toEqual({
        "id": 24,
        "created_at": "2024-07-18T10:47:05.821Z",
        "branch_id": 2,
        "adjustment_line_items": [
            {
                "id": 24,
                "adjustment_id": 24,
                "item_id": 6,
                "quantity": 5,
                "cost": 6.78,
                "created_at": "2024-07-18T10:47:05.821Z"
            }
        ]
    });
      expect(service.createAdjustment).toHaveBeenCalledWith(newAdjustment);
    });
  });
});