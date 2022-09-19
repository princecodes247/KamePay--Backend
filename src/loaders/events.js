// Here we import all events

import UserSubscriber from '../subscribers/user.subscriber';

const initializeEvents = () => {
  UserSubscriber();
  // const userss = new UserSubscriber(eventDispatcher);
  // const userss = new UserSubscriber(eventDispatcher);
};

export default initializeEvents;
