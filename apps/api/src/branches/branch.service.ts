import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Branch} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class BranchService{
constructor(private prisma: PrismaService){
   
}
async getBranches(): Promise<Branch[]> {
    try {
        const branches = await this.prisma.branch.findMany();
        return branches;
    } catch (error) {
        throw new HttpException('Failed to fetch branches', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}