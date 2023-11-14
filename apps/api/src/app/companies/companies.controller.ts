import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { CompanyDto } from './dto/company.dto';
import { CursorQuery } from '../shared/pagination/cursor-query';
import { CursorResponse } from '../shared/pagination/cursor-response';
import { ApiOkCursorResponse } from '../shared/decorators/cursor-response.decorator';

@ApiTags('companies')
@Controller({ version: '1', path: 'companies' })
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOkCursorResponse(CompanyDto)
  @ApiNotFoundResponse({ description: 'No records found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: CursorQuery) {
    const { cursor, limit } = query;
    const { data, cursor: nextCursor } = await this.companiesService.findAll(
      limit,
      cursor
    );

    return new CursorResponse(data, nextCursor);
  }
}
