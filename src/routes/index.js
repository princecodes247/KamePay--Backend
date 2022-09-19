import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';
import agendash from './agendash.route';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);

  return app;
};
