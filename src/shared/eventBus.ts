// src/shared/eventBus.ts

type EventMap = {
  travelStart: { from: number; to: number };
  travelEnd: { place: number };
  placeChanged: { place: number };
  objectHovered: { objectKey: string };
  objectUnhovered: {};
};

type EventCallback<T> = (data: T) => void;

class EventEmitter<T extends Record<string, unknown>> {
  private listeners: { [K in keyof T]?: EventCallback<T[K]>[] } = {};

  on<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    const cbs = this.listeners[event];
    if (!cbs) return;
    this.listeners[event] = cbs.filter(cb => cb !== callback) as typeof cbs;
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    const cbs = this.listeners[event];
    if (!cbs) return;
    for (const cb of cbs) {
      cb(data);
    }
  }
}

const eventBus = new EventEmitter<EventMap>();
export default eventBus;
export type { EventMap };
