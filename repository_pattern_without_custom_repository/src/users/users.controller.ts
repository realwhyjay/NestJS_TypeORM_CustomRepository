import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  async getAllUsers(): Promise<any> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() body: { name: string; age: number }): Promise<any> {
    const user = await this.usersService.createUser(body);
    return user;
  }

  @Delete()
  async deleteUser(@Body() body: { user_id: number }): Promise<any> {
    return this.usersService.deleteUser(body);
  }
}
