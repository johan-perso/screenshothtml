(async () => {
	// Import modules
	const screenshot = require('../index.js')
	const fs = require('fs')
	const path = require('path')

	// Capture HTML code
	var image = await screenshot({
		html: fs.readFileSync(path.join(__dirname, 'example.html'), 'utf8'), // HTML code to capture
		maxTimeout: 15000, // Maximum amount of time to wait (in ms) before giving up
		viewportWidth: 1600, // Viewport width (in px)
		viewportHeight: 900, // Viewport height (in px)
		autoCloseAfter: -1 // Edit the required time to wait before closing the browser (in ms, -1 to disable)
	})

	// Save the image on drive
	fs.writeFileSync(path.join(__dirname, 'example.png'), image)
	console.log(`Image saved as: ${path.join(__dirname, 'example.png')}`)
})()