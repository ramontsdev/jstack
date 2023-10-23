import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';
import { OptionalParseEnumPipe } from 'src/shared/pipes/optional-parse-enum-pipe';
import { OptionalParseUUIDPipe } from 'src/shared/pipes/optional-parse-uuid-pipe';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/transaction';
import { TransactionsService } from './service/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService
  ) {}

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    const { bankAccountId, categoryId } = createTransactionDto

    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType)) type?: TransactionType
  ) {
    return this.transactionsService.findAllByUserId(userId, { month, year, bankAccountId, type });
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
