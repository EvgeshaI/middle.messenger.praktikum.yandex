type Listener = (...args: any[]) => void;
export default class EventBus {
    private listeners: { [event: string]: Listener[] };
    constructor() {
        this.listeners = {};
    }

    on(event:string, callback: Listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
  }

    off(event: string, callback: Listener) {
        if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

    emit(event: string, ...args: any[]) {  // any: args может быть массивом любых значений, и мы заранее не знаем, какие именно значения будут передаваться.
        if (!this.listeners[event]) {
                throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
