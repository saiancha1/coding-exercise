import { Module } from '@nestjs/common';
import { AdjustmentController } from './adjustment.controller';
import { AdjustmentService } from './adjustment.service';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [],
    controllers: [AdjustmentController],
    providers: [AdjustmentService, PrismaService],
})
export class AdjustmentModule {}