import { Container } from 'typedi';
import { EventDispatcher } from 'event-dispatch';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../config';

import AuthService from '../services/auth.service';
import MailService from '../services/mail.service';
import UserService from '../services/user.service';

import LoggerInstance from './logger';
import agendaFactory from './agenda';

export default ({ mongoConnection, models }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });
    const mgInstance = new Mailgun(formData);
    const eventDispatcher = new EventDispatcher();

    Container.set('agendaInstance', agendaInstance);
    Container.set('eventDispatcher', eventDispatcher);
    Container.set('logger', LoggerInstance);
    Container.set('emailClient', mgInstance.client({ key: config.emails.apiKey, username: config.emails.apiUsername }));
    Container.set('emailDomain', config.emails.domain);

    // Controllers

    // Services
    Container.set('mail.service', new MailService());
    Container.set('auth.service', new AuthService());
    Container.set('user.service', new UserService());

    LoggerInstance.info('👌 Agenda injected into container');

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
