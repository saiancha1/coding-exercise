import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AdjustmentService } from './adjustment.service';
import { Adjustment } from '@prisma/client';

@Controller('adjustments')
export class AdjustmentController {
    constructor(private readonly adjustmentService: AdjustmentService) {}

    @Get()
    getAllAdjustments(): Promise<Adjustment[]> {
        return this.adjustmentService.getAllAdjustments();
    }

    @Get(':id')
    getAdjustmentById(@Param('id') id: string): Promise<Adjustment> {
        const adjustmentId = parseInt(id);
        if (isNaN(adjustmentId)) { 
          throw new HttpException('Invalid order ID', HttpStatus.BAD_REQUEST);
        }
        return this.adjustmentService.getAdjustmentById(adjustmentId);
    }

    @Post()
    createAdjustment(@Body() createAdjustmentDto: any):  Promise<{ id: number }> {
        return this.adjustmentService.createAdjustment(createAdjustmentDto);
    }
}