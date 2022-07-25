// Import Puppeteteer
const puppeteer = require('puppeteer')

// Prepare some variables
var browser
var browserLastUse
var someDates = {}
var puppeteerArgs = ['--autoplay-policy=user-gesture-required','--disable-background-networking','--disable-background-timer-throttling','--disable-backgrounding-occluded-windows','--disable-breakpad','--disable-client-side-phishing-detection','--disable-component-update','--disable-default-apps','--disable-dev-shm-usage','--disable-domain-reliability','--disable-extensions','--disable-features=AudioServiceOutOfProcess','--disable-hang-monitor','--disable-ipc-flooding-protection','--disable-notifications','--disable-offer-store-unmasked-wallet-cards','--disable-popup-blocking','--disable-print-preview','--disable-prompt-on-repost','--disable-renderer-backgrounding','--disable-setuid-sandbox','--disable-speech-api','--disable-sync','--hide-scrollbars','--ignore-gpu-blacklist','--metrics-recording-only','--mute-audio','--no-default-browser-check','--no-first-run','--no-pings','--no-sandbox','--no-zygote','--password-store=basic','--use-gl=swiftshader','--use-mock-keychain']

/**
 * Capture HTML Code
 * 
 * ```js
 * const screenshot = require('screenshothtml')
 * var image = await screenshot({
 * 	html: '<h1>Hello world</h1>'
 * })
 * fs.writeFileSync('test.png', image)
 * ```
 * 
 * @param   {object}   options                       Options
 * @param   {string}   options.html                  HTML Code to capture
 * @param   {number}   options.maxTimeout            Maximum time to wait for the page to load (in ms)
 * @param   {number}   options.viewportWidth         Viewport width
 * @param   {number}   options.viewportHeight        Viewport height
 * @param   {number}   options.autoCloseAfter        Edit the time (in ms) required before the browser close after the screenshot
 * @param   {number}   options.puppeteerArguments    Add additional arguments passed to puppeteer while creating the browser (don't work if already created)
 * @param   {number}   options.waitForDomLoaded      Use "domcontentloaded" instead of "networkidle2" (can cause problems, check the documentation)
*/
async function captureHTML(options= { html: `<h1>No code gived :(</h1>`, maxTimeout: 10000, viewportWidth: 1920, viewportHeight: 1080, autoCloseAfter: 60000, puppeteerArguments: {}, waitForDomLoaded: false }){
	// Get the list of arguments to pass to puppeteer
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) someDates.browserOpen = new Date().getTime()
	var puppeteerOptions = {
		headless: true,
		waitForInitialPage: true,
		args: puppeteerArgs
	}
	puppeteerOptions = Object.assign(puppeteerOptions, options.puppeteerArguments)

	// If the browser is not created, create it
	if(!browser) browser = await puppeteer.launch(puppeteerOptions)
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) console.log(`browserOpen: ${new Date().getTime() - someDates.browserOpen}`)

	// Open a new page
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) someDates.pageOpen = new Date().getTime()
	const page = await browser.newPage()
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) console.log(`pageOpen: ${new Date().getTime() - someDates.pageOpen}`)

	// Define the viewport
	await page.setViewport({
		width: options.viewportWidth || 1920,
		height: options.viewportHeight || 1080
	})

	// Define the HTML code
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) someDates.gotoPage = new Date().getTime()
	options.html = String(options.html)
	if(options?.html?.startsWith('url:')) await page.goto(options?.html?.replace('url:',''), { waitUntil: (options.waitForDomLoaded ? 'domcontentloaded' : 'networkidle2'), timeout: options?.maxTimeout || 10000 })
	else await page.setContent(options?.html, { waitUntil: (options.waitForDomLoaded ? 'domcontentloaded' : 'networkidle2'), timeout: options?.maxTimeout || 10000 })
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) console.log(`gotoPage: ${new Date().getTime() - someDates.gotoPage}`)

	// Do the screenshot
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) someDates.screenshot = new Date().getTime()
	const image = await page.screenshot()
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) console.log(`screenshot: ${new Date().getTime() - someDates.screenshot}`)

	// Close the page
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) someDates.closePage = new Date().getTime()
	await page.close()
	if(process.env.SCREENSHOTHTML_SHOW_STATISTICS) console.log(`closePage: ${new Date().getTime() - someDates.closePage}`)

	// Close the browser after the capture if it's not used for a long time
	browserLastUse = Date.now()
	options.autoCloseAfter = (options.autoCloseAfter == 0 ? 0 : (options.autoCloseAfter || 60000))
	if(options.autoCloseAfter > -1) var timeout = setTimeout(() => {
		if(Date.now() - browserLastUse > options.autoCloseAfter){
			if(browser){
				browser.close()
				browser = null
			}
			clearTimeout(timeout)
		}
	}, options.autoCloseAfter)

	// Return the image
	return image
}

/**
 * Close the Puppeteer browser (can cause error if used while capturing)
 * 
 * ```js
 * const screenshot = require('screenshothtml')
 * await screenshot.close()
 * ```
*/
async function closeBrowser(){
	if(browser){
		browser.close()
		browser = null
		return "browserClosed"
	} else return "browserAlreadyClosed"
}

// Export some functions
module.exports = captureHTML
module.exports.close = closeBrowser
module.exports.browser = browser
module.exports.browserLastUse = browserLastUse
module.exports.puppeteerArgs = puppeteerArgs
module.exports.version = require('./package.json').version
