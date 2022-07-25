(async () => {
	// Import modules
	const screenshot = require('../index.js')
	const fs = require('fs')
	const path = require('path')

	// Capture HTML code
	var image = await screenshot({
		html: fs.readFileSync(path.join(__dirname, 'example.html'), 'utf8'), // HTML code to capture
		autoCloseAfter: -1, // Edit the required time to wait before closing the browser (in ms, -1 to disable)
		puppeteerArguments: { // Pass arguments when launching Puppeteer browser
			headless: false, // Launch browser without headless mode (so we can actually see the browser window)
			slowMo: 400 // Slow down Puppeteer browser
		}
	})

	// Save the image on drive
	fs.writeFileSync(path.join(__dirname, 'example.png'), image)
	console.log(`Image saved as: ${path.join(__dirname, 'example.png')}`)
})()