import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientRepository extends Repository<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {
    super(repository.target, repository.manager);
  }

  async getClientIds() {
    return this.repository.find({ select: { id: true, name: true } });
  }
}
