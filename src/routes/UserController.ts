import { isNumber, validate } from 'class-validator';
import {
  Get, Param, JsonController, Body, Post, Put
} from 'routing-controllers';
import { User, UserFilterParams } from '../domain/User';
import { Utils } from './Utils';

const Users: User[] = [{
  id: 1,
  name: 'first',
  password: 'aaa',
}, {
  id: 2,
  name: 'second',
  password: 'aaa',
}]

@JsonController("/users")
export class UserController {
  @Get("/")
  getAll() {
    return { items: Users };
  }

  @Get('/id/:id')
  getOne(@Param('id') id: number) {
    if ((!isNumber(id) || id < 1)) return { errors: ['Incorrect ID'] };

    const user = Users.find(item => item.id === id);
    return user
      ? { item: user }
      : { errors: ['User not found'] };
  }

  @Post('/')
  async getUsersByFilter(
    @Body() filters: UserFilterParams,
  ) {
    const errors = await validate(filters);
    if (errors.length) {
      return { errors: Utils.getErrorMessages(errors) };
    }

    const users = Users.filter(item => item.name?.includes(filters.name));
    return { users: users };
  }

  //   @Post('/users')
  //   post(@Body() user: any) {
  //     return 'Saving user...';
  //   }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  //   @Delete('/users/:id')
  //   remove(@Param('id') id: number) {
  //     return 'Removing user...';
  //   }

}