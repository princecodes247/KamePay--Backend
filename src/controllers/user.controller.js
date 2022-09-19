import { Container } from 'typedi';

class UserController {
  async getAllUsers(req, res) {
    const UserService = Container.get('user.service');
    const users = await UserService.getAll();
    return res.json({ users }).status(200);
  }

  async test(req, res) {
    const UserService = Container.get('user.service');
    const test = await UserService.test();
    return res.json({ test }).status(200);
  }
}

export default new UserController();
