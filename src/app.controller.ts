import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { CreateTestDto } from './dto/create-test.dto';

@Controller('gateway')
export class AppController {
  constructor(
    @Inject('MICROSERVICE_QUEUE') private readonly client: ClientProxy,
  ) {}

  @Post('test')
  async createTest(@Body() createTestDto: CreateTestDto) {
    return this.client.send({ cmd: 'create_test' }, createTestDto);
  }

  @Get('test')
  async findAllTests() {
    return this.client.send({ cmd: 'get_tests' }, {});
  }
}
