import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllClients() {
    const clients = await this.clientsRepository.find();
    return clients;
  }

  async createClient(body: { name: string; user_id: number; age: number }) {
    const { name, age, user_id } = body;

    const user = await this.usersRepository.findOne({ where: { id: user_id } });
    const client = this.clientsRepository.create({ name, age });
    client.user = user;

    await this.clientsRepository.save(client);
    return client;
  }
}
