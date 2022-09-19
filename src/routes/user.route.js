import { Router } from 'express';

import UserController from '../controllers/user.controller';
import middlewares from '../middlewares';

const route = Router();

export default app => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) =>
    res.json({ user: req.currentUser }).status(200)
  );

  route.get('/', UserController.getAllUsers);
  route.get('/test', UserController.test);
};
