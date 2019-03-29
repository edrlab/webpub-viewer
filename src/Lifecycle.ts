// Heavily inspired by https://github.com/GoogleChromeLabs/page-lifecycle

interface PVIndexedObject {
  [key: string]: number
}

interface RegistryObject {
  [key: string]: Array<Function>
}

interface IDict {
  newState: string;
  oldState: string;
  originalEvent: Event;
}

// Note: The module currently is using Event and Event Target shims by default, and doesn’t check if constructable events are supported
class EventShim {
  public type: string;
  public target: EventTargetShim;

  constructor(type: string) {
    this.type = type;
  }
}

class EventTargetShim {
  public _registry: RegistryObject;
 
  constructor() {
    this._registry = {};
  }

  public addEventListener(type: string, listener: Function) {
    this.getRegistry(type).push(listener);
  }

  public removeEventListener(type: string, listener: Function) {
    const typeRegistry = this.getRegistry(type);
    const handlerIndex = typeRegistry.indexOf(listener);
    if (handlerIndex > -1) {
      typeRegistry.splice(handlerIndex, 1);
    }
  }

  public dispatchEvent(evt: StateChangeEvent): boolean {
    evt.target = this;
    Object.freeze(evt);

    this.getRegistry(evt.type).forEach((listener) => listener(evt));
    return true;
  }

  private getRegistry(type: string): Array<Function> {
    return this._registry[type] = (this._registry[type] || []);
  }
}

export class StateChangeEvent extends EventShim {
  public newState: string;
  public oldState: string;
  public originalEvent: Event;

  constructor(type: string, initDict: IDict) {
    super(type);
    this.newState = initDict.newState;
    this.oldState = initDict.oldState;
    this.originalEvent = initDict.originalEvent;
  }
}

const SUPPORTS_PAGE_TRANSITION_EVENTS = "onpageshow" in self;

const IS_SAFARI = (typeof (window as any).safari === "object" && (window as any).safari.pushNotification);

const toIndexedObject = (arr: Array<string>) => arr.reduce((acc: PVIndexedObject, val, idx): Object => {
  acc[val] = idx;
  return acc;
}, {});

export class Lifecycle extends EventTargetShim {
  private _state: string;
  private _safariBeforeUnloadTimeout: any;

  private static readonly ACTIVE = "active";
//  private static readonly PASSIVE = "passive";
  private static readonly HIDDEN = "hidden";
  private static readonly FROZEN = "frozen";
  private static readonly TERMINATED = "terminated";

  // Note: Passive is missing in the transitions below
  private static LEGAL_STATE_TRANSITIONS: Array<PVIndexedObject> = [
    // The normal unload process (bfcache process is addressed above).
    [Lifecycle.ACTIVE, Lifecycle.HIDDEN, Lifecycle.TERMINATED],

    // An active page transitioning to frozen,
    // or an unloading page going into the bfcache.
    [Lifecycle.ACTIVE, Lifecycle.HIDDEN, Lifecycle.FROZEN],

    // A hidden page transitioning back to active.
    [Lifecycle.HIDDEN, Lifecycle.ACTIVE],

    // A frozen page being resumed
    [Lifecycle.FROZEN, Lifecycle.HIDDEN],

    // A frozen (bfcached) page navigated back to
    // Note: [FROZEN, HIDDEN] can happen here, but it's already covered above.
    [Lifecycle.FROZEN, Lifecycle.ACTIVE]
  ].map(toIndexedObject);

  private static readonly EVENTS: Array<string> = [
    "focus",
    "blur",
    "visibilitychange",
    "freeze",
    "resume",
    "pageshow",
    SUPPORTS_PAGE_TRANSITION_EVENTS ? "pagehide" : "unload",
  ];

  constructor() {
    super();
    this._state = this.getCurrentState();

    this.handleEvents = this.handleEvents.bind(this);

    Lifecycle.EVENTS.forEach((evt) => addEventListener(evt, this.handleEvents, true));

    if (IS_SAFARI) {
      addEventListener("beforeunload", (evt) => {
        this._safariBeforeUnloadTimeout = setTimeout(() => {
          if (!(evt.defaultPrevented || !evt.returnValue)) {
            this.dispatchChangesIfNeeded(evt, Lifecycle.HIDDEN);
          }
        }, 0);
      });
    }
  }

  get state(): string {
    return this._state;
  }

  get pageWasDiscarded(): boolean {
    return (document as any).wasDiscarded || false;
  }

  private getLegalStateTransitionPath = (oldState: string, newState: string): Array<string> => {
    for (let order: PVIndexedObject, i = 0; order = Lifecycle.LEGAL_STATE_TRANSITIONS[i]; ++i) {
      const oldIndex = order[oldState];
      const newIndex = order[newState];

      if (oldIndex >= 0 &&
        newIndex >= 0 &&
        newIndex > oldIndex) {
        return Object.keys(order).slice(oldIndex, newIndex + 1);
      }
    }
    return [];
  };

  // Note: Model was simplified due to the lack of "passive" support
  private getCurrentState = (): string => {
    if (document.visibilityState === Lifecycle.HIDDEN) {
      return Lifecycle.HIDDEN;
    }
    return Lifecycle.ACTIVE;
  };

  private dispatchChangesIfNeeded(originalEvent: Event, newState: string) {
    if (newState !== this._state) {
      const oldState = this._state;
      const path = this.getLegalStateTransitionPath(oldState, newState);

      for (let i = 0; i < path.length - 1; ++i) {
        const oldState = path[i];
        const newState = path[i + 1];

        this._state = newState;
        this.dispatchEvent(new StateChangeEvent("statechange", {
          oldState,
          newState,
          originalEvent,
        }));
      }
    }
  }

  private handleEvents(evt: Event) {
    if (IS_SAFARI) {
      clearTimeout(this._safariBeforeUnloadTimeout);
    }

    // Note: model was simplified due to the lack of "passive" support
    switch (evt.type) {
      case "pageshow":
      case "resume":
        this.dispatchChangesIfNeeded(evt, this.getCurrentState());
        break;
      case "focus":
        if (this._state !== Lifecycle.ACTIVE) {
          this.dispatchChangesIfNeeded(evt, Lifecycle.ACTIVE);
        }
        break;
      case "blur":
        // The `blur` event can fire while the page is being unloaded, so we
        // only need to update the state if the current state is "active".
        if (this._state === Lifecycle.ACTIVE) {
          this.dispatchChangesIfNeeded(evt, this.getCurrentState());
        }
        break;
      case "pagehide":
      case "unload":
        this.dispatchChangesIfNeeded(evt, (evt as PageTransitionEvent).persisted ? Lifecycle.FROZEN : Lifecycle.TERMINATED);
        break;
      case "visibilitychange":
        // The document's `visibilityState` will change to hidden  as the page
        // is being unloaded, but in such cases the lifecycle state shouldn't
        // change.
        if (this._state !== Lifecycle.FROZEN &&
          this._state !== Lifecycle.TERMINATED) {
          this.dispatchChangesIfNeeded(evt, this.getCurrentState());
        }
        break;
      case "freeze":
        this.dispatchChangesIfNeeded(evt, Lifecycle.FROZEN);
        break;
    }
  }
}