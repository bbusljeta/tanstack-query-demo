import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountDto } from './dto/account.dto';
import { Pagination } from '../shared/pagination/pagination';

@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: [AccountDto],
  })
  @ApiNotFoundResponse({ description: 'No records found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: Pagination) {
    return this.accountsService.findAll(query.limit, query.offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
