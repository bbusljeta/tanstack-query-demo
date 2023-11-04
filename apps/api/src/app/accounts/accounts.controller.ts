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
  NotFoundException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountDto } from './dto/account.dto';
import { PagedQuery } from '../shared/pagination/paged-query';
import { PagedResponse } from '../shared/pagination/paged-response';
import { ApiOkPagedResponse } from '../shared/decorators/paged-response.decorator';

@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOkResponse({
    description: 'The account has been successfully created.',
    type: AccountDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      return await this.accountsService.create(createAccountDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkPagedResponse(AccountDto)
  @ApiNotFoundResponse({ description: 'No records found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: PagedQuery) {
    const { limit, offset, page } = query;
    const response = await this.accountsService.findAll(limit, offset);

    const { totalRows, totalPages, data } = response;

    return new PagedResponse(totalRows, totalPages, page, data);
  }

  @Get(':id')
  @ApiOkResponse({
    type: AccountDto,
  })
  @ApiNotFoundResponse({ description: 'Account not found' })
  async findOne(@Param('id') id: string) {
    const account = await this.accountsService.findOne(+id);

    if (!account)
      throw new NotFoundException({
        message: 'Account not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The account has been successfully updated.',
    type: AccountDto,
  })
  @ApiNotFoundResponse({ description: 'Account not found' })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    const account = await this.accountsService.findOne(+id);

    if (!account)
      throw new NotFoundException({
        message: 'Account not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Account not found' })
  async remove(@Param('id') id: string) {
    const account = await this.accountsService.findOne(+id);

    if (!account)
      throw new NotFoundException({
        message: 'Account not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return this.accountsService.remove(+id);
  }
}
