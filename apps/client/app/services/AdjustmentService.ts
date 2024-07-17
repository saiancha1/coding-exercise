import { ApiService } from './ApiService';

export class AdjustmentService {
  static async createAdjustment(payload: any) {
    const response = await fetch(`${ApiService.baseUrl}/adjustments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create adjustment`);
    }

    return response.json();
  }
}