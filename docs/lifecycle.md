# Page Lifecycle API

Browsers handle the page lifecycle in different ways, especially when it comes to blurring, focusing, and unloading the document. Some events may even be unreliable cross-platform.

This is the reason why we have decided to use an abstraction based on a simplified model of the [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).

Its major goal is to normalize browsers’ inconsistencies and make this API usable right now. It should cover most user scenarios possible by providing an `statechange` event letting the Reader know in which state it currently is, so that it can react to users’ actions related to the browser itself – e.g. opening another tab, hiding/minimizing, switching to another app, etc. 

## How to use

```
import { Lifecycle, StateChangeEvent } from "./Lifecycle";

const lifecycle = new Lifecycle();

lifecycle.addEventListener("statechange", (evt: StateChangeEvent) => {
  if (evt.newState === "active") {
    // do something
  } else if (evt.newState === "hidden") {
    // do something else
  } else if (evt.newState === "frozen") {
    // Handle critical info and stop some tasks cleanly
  }
}
```

Available `StateChangeEvent` properties are: 

- `newState`
- `oldState`
- `originalEvent`

The `active` and `hidden` states have been tested for critical tasks over the last weeks, in all major browsers and on all major platforms, and can be reported as reliable. They’re even more reliable than original events e.g. `visibilitychange` in some browsers. We’ve been aggressively using `hidden` so didn’t necessarily use `frozen` for some critical tasks.

## Use Cases

- stopping timers when the page is hidden
- pausing audio/video when the user is active in another tab
- storing/syncing critical data when the reader is about to become frozen (e.g. cross-platform syncing of current location, bookmark, etc.)
- minimizing the reader’s footprint if it’s been inactive for a while
- etc.

Basically, this can help the cloud reader react to external events related to the browser itself – i.e. how the user is effectively interacting with the browser.

## Lifecycle Events

The simplified lifecycle is the following: 

1. `active`
2. `hidden`
3. `frozen`
4. `terminated`

Unfortunately, a `passive` state is currently unreliable due to incompatibilities across browsers – `blur()` firing (or not) when interacting in the `iframe` context.

While we could have simply used `visibilitychange`, this abstraction has quite a few benefits: 

- it normalizes a lot of inconsistencies;
- it covers more scenarios;
- it catches the first user-interaction/event making the reader non-active;
- it catches the 2 last states when they are supported, and allows the Reader to stop timers, store critical data, etc. more cleanly.

### What Those States Mean

#### Active

The browser is open and the cloud reader is the current/focused tab.

This means that another app may well be running in the foreground, but we can’t infer that the cloud reader is `passive` (in the background/not focused) so we consider it `hidden`.

#### Hidden

This means one of the following: 

- the browser is open but the cloud reader is not the current/focused tab (should be `passive`);
- the browser is minimized/hidden – the exception being Chrome on MacOS, but it seems to be a bug;
- the user quit the cloud reader on mobile, either via the home button, the app manager, or the previous button.

#### Frozen

This means the cloud reader is hidden and the browser freezes some JavaScript tasks to preserve CPU/battery/data usage.

At this point, it’s critical to save what has not been saved yet and stop what should be stopped cleanly.

#### Terminated

The cloud reader is being explicitely terminated by the OS because it needs resources for another app. The reader may well still be visible, but it’s not interactive, and the page will be reloaded on the next use.

### The problem with `passive`

To put it simply, `iframe` is another window, so some browsers will `blur` the parent document while others won’t. So when the user interacts with the `iframe`, the cloud reader would be told it is `passive`, which is clearly not the case. 

This can even be inconsistent in the same browser on different platforms. Chrome on Android won’t `blur` the document, it will keep it `focus`ed, while Chrome Desktop will `blur`.

So the lifecycle has been simplified for this first revision since `passive` would only improve the model; it was not critical for the tasks we had to manage.

## Original Events

Tests made using https://page-lifecycle.glitch.me

### Stopping/Pausing

Those are the events that fire first for user interactions.

|               | Close        | Reload   | Hide                  | switch tabs           |
|---------------|--------------|----------|-----------------------|-----------------------|
| Chrome        | blur         | pagehide | blur                  | visibilitychange      |
| Chrome Mobile | blur         | pagehide | blur                  | blur/visibilitychange |
| Safari        | beforeunload | pagehide | visibilitychange      | blur                  |
| Safari Mobile | NOTHING      | pagehide | blur                  | blur                  |
| Firefox       | blur         | pagehide | visibilitychange      | blur/visibilitychange |
| Edge          | blur         | pagehide | blur/visibilitychange | blur/visibilitychange |

### Resuming after pausing

Those are the events that fire when resuming a browsing session – page is really active – and the events firing just before.

|               | Resume | Debt                  |
|---------------|--------|-----------------------|
| Chrome        | focus  | blur/visibilitychange |
| Chrome Mobile | focus  | visibilitychange      |
| Safari        | focus  | visibilitychange/blur |
| Safari Mobile | focus  | blur                  |
| Firefox       | focus  | visibilitychange      |
| Edge          | focus  | visibilitychange      |

### Details 

#### Chrome Desktop

- Window reload: `pagehide`
- Hide and return to browser: `blur` -> `focus`
- Switch to another tab then come back: `visibilitychange` -> `focus`
- Click link opening in same tab: `pagehide`
- Open another website in same tab: `blur` -> `focus` -> `pagehide`
- Close tab: `blur`
- Close Window: `blur`
- Close browser: `blur`

#### Chrome Mobile

- Window reload: `pagehide`
- Hide and return to browser: `blur` -> `visibilitychange` -> `focus`
- Switch to another tab then come back: `blur` -> `visibilitychange` -> `focus`
- Click link opening in same tab: `pagehide`
- Open another website in same tab: `blur` -> `focus` -> `pagehide`
- Close tab: `blur` -> `visibilitychange`
- Close Window: DNA
- Close browser: DNA

#### Safari Desktop

- Window reload: `beforeunload` -> `pagehide`
- Hide and return to browser: `visibilitychange` -> `focus`
- Switch to another tab then come back: `blur` -> `focus`
- Click link opening in same tab: `beforeunload` -> `pagehide`
- Open another website in same tab: `beforeunload`
- Close tab: `beforeunload`
- Close Window: `beforeunload`
- Close browser: `beforeunload`

#### Safari Mobile

- Window reload: `pagehide`
- Hide and return to browser: `blur` -> `focus`
- Switch to another tab then come back: `blur` -> `focus`
- Click link opening in same tab: `pagehide`
- Open another website in same tab: `pagehide`
- Close tab: **NOTHING**
- Close Window: DNA
- Close browser: DNA

#### Firefox Desktop

- Window reload: `pagehide`
- Hide and return to browser: `visibilitychange` -> `focus`
- Switch to another tab then come back: `blur` -> `visibilitychange` -> `focus`
- Click link opening in same tab: `pagehide`
- Open another website in same tab: `blur` -> `focus` -> `pagehide`
- Close tab: `blur` -> `pagehide`
- Close Window: `blur` -> `pagehide`
- Close browser: `blur` -> `pagehide`

#### MSEdge

- Window reload: `pagehide`
- Hide and return to browser: `blur` -> `visibilitychange` -> `focus` 
- Switch to another tab then come back: `blur` -> `visibilitychange` -> `focus`
- Click link opening in same tab: `pagehide`
- Open another website in same tab: `blur` -> `focus` -> `pagehide`
- Close tab: `blur` -> `pagehide`
- Close Window: `blur` -> `pagehide`
- Close browser: `blur` -> `pagehide`