import { Adjustment } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdjustmentService {
    constructor(private prisma: PrismaService){
    }
    
    async getAllAdjustments(): Promise<Adjustment[]> {
        return await this.prisma.adjustment.findMany({include: {adjustment_line_items: true}});
    }

    async createAdjustment(adjustment: Adjustment): Promise<Adjustment> {
        const result = await this.prisma.$transaction(async (prisma) =>{
            const createdAdjustment = await prisma.adjustment.create({ data: adjustment, include: {adjustment_line_items: true} });
             await Promise.all(
                createdAdjustment.adjustment_line_items.map(async (lineItem) => {
                  const direction = lineItem.quantity > 0 ? 1 : -1;
                  await prisma.stock_Movement.create({
                    data: {
                      Direction: direction,
                      TransactionType: 'Adjustment',
                      ItemID: lineItem.item_id,
                      Quantity: lineItem.quantity,
                      Branch_Id: createdAdjustment.branch_id,
                      Applied_Transaction_Id: createdAdjustment.id,
                    },
                  });
                })
              );
          
              return createdAdjustment;
        });
        return result;
    }

    async getAdjustmentById(id: number): Promise<Adjustment | undefined> {
        return await this.prisma.adjustment.findFirst({ where: { id } });
    }
}

