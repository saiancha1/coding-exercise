import {Injectable} from '@nestjs/common';
import {StockSummary} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class StockSummaryService {
  constructor(private prisma: PrismaService) {
  }

  async findAll(): Promise<StockSummary[]> {
    return this.prisma.stockSummary.findMany({include: {item: true}});
  }
}