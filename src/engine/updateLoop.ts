type UpdateCallback = (elapsedTime: number, update: Update) => void;

class UpdateLoop {
    firstEvent: Update | null;
    lastEvent: Update | null;
    constructor(firstEvent: Update | null) {
        this.firstEvent = firstEvent;
        this.lastEvent = firstEvent;
    }

    push(callback: UpdateCallback) {
        const update = new Update(callback, this, this.lastEvent, null);
        if (this.firstEvent === null || this.lastEvent === null) {
            this.firstEvent = update;
            this.lastEvent = update;
            return update;
        }
        this.lastEvent.nextEvent = update;
        this.lastEvent = update;
        return update;
    }

    remove(update: Update) {
        if (update.previousEvent === null) {
            this.firstEvent = update.nextEvent;
        } else {
            update.previousEvent.nextEvent = update.nextEvent;
        }

        if (update.nextEvent === null) {
            this.lastEvent = update.previousEvent;
        } else {
            update.nextEvent.previousEvent = update.previousEvent;
        }
    }

    update(elapsedTime: number) {
        let currentEvent: Update | null = this.firstEvent;
        while (currentEvent !== null) {
            currentEvent.update(elapsedTime);
            currentEvent = currentEvent.nextEvent;
        }
    }
}

class Update {
    callback: UpdateCallback;
    previousEvent: Update | null;
    nextEvent: Update | null;
    updateLoop: UpdateLoop;
    constructor(callback: UpdateCallback, updateLoop: UpdateLoop, previousEvent: Update | null, nextEvent: Update | null ) {
        this.previousEvent = previousEvent;
        this.nextEvent = nextEvent;
        this.callback = callback;
        this.updateLoop = updateLoop;
    }

    update(elapsedTime: number) {
        this.callback(elapsedTime, this);
    }

    remove() {
        this.updateLoop.remove(this);
    }
}

export type CurrentUpdate = Update;
export default UpdateLoop;

