import { AdjustmentService } from './AdjustmentService';

jest.mock('./ApiService', () => ({
  ApiService: {
    baseUrl: 'http://localhost:3100/api',
  },
}));

global.fetch = jest.fn();

describe('AdjustmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createAdjustment - success', async () => {
    const mockJsonPromise = Promise.resolve({
        "id": 24,
        "created_at": "2024-07-16T11:29:58.003Z",
        "branch_id": 2,
        "adjustment_line_items": [
            {
                "id": 24,
                "adjustment_id": 24,
                "item_id": 6,
                "quantity": 5,
                "cost": "6.78",
                "created_at": "2024-07-16T11:29:58.003Z"
            }
        ]
    });
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    (global.fetch as jest.Mock).mockImplementationOnce(() => mockFetchPromise);

    const payload = {
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
    const response = await AdjustmentService.createAdjustment(payload);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3100/api/adjustments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    expect(response).toEqual({
        "id": 24,
        "created_at": "2024-07-16T11:29:58.003Z",
        "branch_id": 2,
        "adjustment_line_items": [
            {
                "id": 24,
                "adjustment_id": 24,
                "item_id": 6,
                "quantity": 5,
                "cost": "6.78",
                "created_at": "2024-07-16T11:29:58.003Z"
            }
        ]
    });
  });

  it('createAdjustment - failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));

    const payload ={
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
    await expect(AdjustmentService.createAdjustment(payload)).rejects.toThrow('Failed to create adjustment');
  });

  it('fetchAdjustments - success', async () => {
    const mockJsonPromise = Promise.resolve([  {
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
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    (global.fetch as jest.Mock).mockImplementationOnce(() => mockFetchPromise);

    const response = await AdjustmentService.fetchAdjustments();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3100/api/adjustments');
    expect(response).toEqual([  {
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
  });

  it('fetchAdjustments - failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    await expect(AdjustmentService.fetchAdjustments()).rejects.toThrow('Error fetching adjustments');
  });
});