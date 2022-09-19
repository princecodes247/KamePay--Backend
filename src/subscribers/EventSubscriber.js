import { Container } from 'typedi';

export default class EventSubscriber {
  events = [];

  subscribe() {
    const EventDispatcher = Container.get('eventDispatcher');
    const Logger = Container.get('logger');
    this.events.forEach(event => {
      Logger.info(`👣 Subscribing to "${event.name}" event...`);
      EventDispatcher.attach(this, event.name, event.callback);
    });
  }

  on(name, callback) {
    const EventDispatcher = Container.get('eventDispatcher');
    const Logger = Container.get('logger');
    Logger.info(`👣 Subscribing to "${name}" event...`);
    EventDispatcher.attach(this, name, callback);
  }
}
