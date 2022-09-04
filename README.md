###### French version [here](https://github.com/johan-perso/screenshothtml/blob/main/README.fr.md).

# ScreenshotHTML

ScreenshotHTML allow you to take screenshots of HTML code, using [Puppeteer](https://github.com/puppeteer/puppeteer) (a Chromium-automated-based browser).

⚠️ ScreenshotHTML use headless mode by default, so no navigation window will be visible.


## Installation

NodeJS 14 *(or latest)* is required.

```bash
# Using npm
npm i screenshothtml

# Or using yarn
yarn add screenshothtml

# Or using pnpm
pnpm i screenshothtml
```

This library does not support browsers, you can use [html2canvas](https://html2canvas.hertzen.com/) and [canvas2image](https://github.com/hongru/canvas2image) to get a similar result.


## Options

```js
var image = await screenshot({ <the options> })
```

| Option             | Type    | Example                 | Description                                                                         |
|--------------------|---------|-------------------------|-------------------------------------------------------------------------------------|
| html               | string  | `<h1>Hello world!</h1>` | HTML code to capture                                                                |
| maxTimeout         | int     | `15000                ` | Maximum time to wait for the page to load (in ms)                                   |
| viewportWidth      | int     | `1600                 ` | Viewport width                                                                      |
| viewportHeight     | int     | `900                  ` | Viewport height                                                                     |
| autoCloseAfter     | int     | `100000               ` | Edit the time (in ms) required before the browser close after the screenshot        |
| puppeteerArguments | object  | `{headless: false}    ` | Add additional arguments passed to [Puppeteer](https://github.com/puppeteer/puppeteer/blob/v13.7.0/docs/api.md#puppeteerlaunchoptions) while creating the browser             |
| waitForDomLoaded   | boolean | `false                ` | Wait before the DOM finish to load before taking a screenshot, [more info here](#waitfordomloaded). |


## APIs

```js
const screenshot = require('screenshothtml')
```

**Main :**

`screenshot()`

Do a screenshot of the HTML code.

[list of options](#options).


**Close the browser :**

`await screenshot.close()`

Manually close the browser.


**Use the browser :**

`screenshot.browser`

Return the browser instance, as it is used by the library.


**Last screenshot :**

`screenshot.browserLastUse`

Return the date corresponding to the last screenshot.


**Puppeteer arguments :**

`screenshot.puppeteerArgs`

Return the arguments passed to Chromium while creating the browser, do not confuse with the option `puppeteerArguments` that is different.


**ScreenshotHTML version :**

`screenshot.version`

Return the used version of the library.


## Examples

You can find examples in the `example` folder of this repo.


## Speed

When the environment variable `SCREENSHOTHTML_SHOW_STATISTICS` is set, statistics about the speed are displayed in the terminal.

> Some results on the examples in this repo, tested on my computer.

With the option `waitForDomLoaded` defined with `false`:
* browserOpen: ~330ms
* pageOpen: ~115ms
* gotoPage: ~990ms
* screenshot: ~310ms
* closePage: ~3ms

With the option `waitForDomLoaded` defined avec `true` :
* browserOpen: ~220ms
* pageOpen: ~120ms
* gotoPage: ~20ms
* screenshot: ~480ms
* closePage: ~4ms


## Load a URL instead of code

Instead of inserting HTML code, you can load a URL by replacing the code by `url:<the url of the site>`. This also works with localhost.


## Browser close

After a screenshot, the browser is automatically closed after 60 seconds, you can change this time with the option `autoCloseAfter` (negative number cancel the auto close, and `0` close without waiting).

The browser can also be closed manually with the `close()` function.


## `waitForDomLoaded`

The option `waitForDomLoaded` (boolean) can be used to define if the browser should wait for the DOM to be loaded before taking a screenshot. If the value is `false` (or not defined), the browser will use `networkidle0`, and when it is activated (`true`), the screenshots are faster, but some elements and scripts may be not load, which can be useful if the page only contains a simple HTML code.


## License

MIT © [Johan](https://johanstick.me)
