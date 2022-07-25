(async () => {
	// Import modules
	const screenshot = require('../index.js')
	const fs = require('fs')
	const path = require('path')

	// Repeat 50 times
	for(var i = 1; i < 51; i++){
		// Define date before taking screenshot
		var start = new Date().getTime()

		// Capture HTML code
		var image = await screenshot({
			html: i, // HTML code to capture
			maxTimeout: 5000 // Maximum amount of time to wait (in ms) before giving up
		})

		// Save the image on drive
		fs.writeFileSync(path.join(__dirname, `example_${i}.png`), image)
		console.log(`[${new Date().getTime() - start}ms] Image saved as: ${path.join(__dirname, `example_${i}.png`)}`)
	}

	// Manually close the browser
	await screenshot.close()
	process.exit()
})()