import { Container } from 'typedi';
import CRUD from './factories/crud.factory';

export default class UserService extends CRUD {
  constructor() {
    super();
    this.model = Container.get('user.model');
    // this.eventDispatcher = new EventDispatcher();
  }

  async test() {
    const eventDispatcher = Container.get('eventDispatcher');
    eventDispatcher.dispatch('users');
    return 'test';
  }
}
