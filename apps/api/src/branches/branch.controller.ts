import {Controller, Get} from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchController  {
    constructor(private branchService: BranchService) {
    }
      
    @Get()
    async getBranches() {
        try {
            const branches = await this.branchService.getBranches();
            return branches;
        } catch (error) {
            throw new Error('Failed to fetch branches');
        }
    }
}