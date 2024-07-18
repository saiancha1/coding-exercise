import {Injectable} from '@nestjs/common';
import {StockSummary} from "@prisma/client";
import {PrismaService} from "../prisma.service";

/**
 * Service responsible for retrieving stock summaries.
 */
@Injectable()
export class StockSummaryService {
  constructor(private prisma: PrismaService) {
  }

  /**
   * Retrieves all stock summaries.
   * @returns A promise that resolves to an array of stock summaries.
   */
  async findAll(): Promise<StockSummary[]> {
    return this.prisma.stockSummary.findMany({include: {item: true}});
  }
}