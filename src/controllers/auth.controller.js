import { Container } from 'typedi';

import { ACCESS_TOKEN, cookieOptions, refreshCookieOptions, REFRESH_TOKEN } from '../constants/auth.constants';

class AuthController {
  async signUp(req, res, next) {
    const logger = Container.get('logger');

    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    try {
      const authServiceInstance = Container.get('auth.service');

      const { user, token } = await authServiceInstance.signUp(req.body);
      return res.status(201).json({ user, token });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async signIn(req, res, next) {
    const logger = Container.get('logger');

    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const authServiceInstance = Container.get('auth.service');

      const { email, password } = req.body;
      const { user, tokens } = await authServiceInstance.signIn(email, password);

      const { accessToken, refreshToken } = tokens;

      res.cookie(REFRESH_TOKEN, refreshToken, refreshCookieOptions);
      res.cookie(ACCESS_TOKEN, accessToken, cookieOptions);
      return res.json({ user, accessToken, refreshToken }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

export default new AuthController();
