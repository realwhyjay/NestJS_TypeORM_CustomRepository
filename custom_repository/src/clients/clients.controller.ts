import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  clientsService: ClientsService;

  constructor(clientsService: ClientsService) {
    this.clientsService = clientsService;
  }

  @Get()
  async getAllClients(): Promise<any> {
    return await this.clientsService.getAllClients();
  }

  @Post()
  async createClient(
    @Body() body: { name: string; user_id: number; age: number },
  ): Promise<any> {
    const client = await this.clientsService.createClient(body);
    return client;
  }

  @Post('/transaction')
  async createClientWithTransaction(
    @Body() body: { name: string; user_id: number; age: number },
  ): Promise<any> {
    const client = await this.clientsService.createClientWithTransaction(body);
    return client;
  }
}
