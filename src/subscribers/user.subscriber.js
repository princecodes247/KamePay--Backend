import { Container } from 'typedi';
import events from './events';
import EventSubscriber from './EventSubscriber';

/**
 * spamming insert/update to mongo will kill it eventualy
 * TODO: Implement a queue
 *
 * Use another approach like emit events to a queue (rabbitmq/aws sqs),
 * then save the latest in Redis/Memcache or something similar
 */

const onUsers = async () => {
  console.log('testtttttt');
};

const onUserSignIn = ({ _id }) => {
  const Logger = Container.get('logger');

  try {
    const UserModel = Container.get('UserModel');

    UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
  } catch (e) {
    Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

    // Throw the error so the process die (check src/app.ts)
    throw e;
  }
};

// @On(events.user.signUp)
const onUserSignUp = ({ name, email, _id }) => {
  const Logger = Container.get('logger');
  Logger.silly(`${name} ${email} ${_id}`);
  try {
    /**
     * @TODO implement this
     */
    // Call the tracker tool so your investor knows that there is a new signup
    // and leave you alone for another hour.
    // TrackerService.track('user.signup', { email, _id })
    // Start your email sequence or whatever
    // MailService.startSequence('user.welcome', { email, name })
  } catch (e) {
    Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);

    // Throw the error so the process dies (check src/app.ts)
    throw e;
  }
};

const UserSubscriber = () => {
  const eventSubscriber = new EventSubscriber();
  eventSubscriber.on(events.user.signUp, onUserSignUp);
  eventSubscriber.on(events.user.signIn, onUserSignIn);
  eventSubscriber.on(events.user.test, onUsers);
  return eventSubscriber;
};

export default UserSubscriber;
