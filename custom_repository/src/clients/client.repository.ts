import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepository } from 'common/typeorm-ex.decorator';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Client } from './client.entity';

@CustomRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getClientIds(findOptions?: FindOptionsWhere<Client>): Promise<any> {
    const clientIds = await this.find({
      select: { id: true, name: true },
      ...findOptions,
    });
    const result = clientIds.reduce((acc, cur) => {
      acc.push(cur.id);
      return acc;
    }, []);
    return result;
  }
}
