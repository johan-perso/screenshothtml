(async () => {
	// Import modules
	const screenshot = require('../index.js')
	const fs = require('fs')
	const path = require('path')
	const http = require('http')
	
	// Create a server using HTTP
	var server = http.createServer((req, res) => {
		res.writeHead(200)
		res.end(`<h1>Hello world</h1>`)
	})
	server.listen(8080)

	// Capture HTML code
	var image = await screenshot({
		html: `url:http://localhost:8080`, // Capture a URL
		waitForDomLoaded: true, // Just check documentation for this
		autoCloseAfter: 0 // Edit the required time to wait before closing the browser (in ms, -1 to disable)
	})

	// Stop the server
	server.close()

	// Save the image on drive
	fs.writeFileSync(path.join(__dirname, 'example.png'), image)
	console.log(`Image saved as: ${path.join(__dirname, 'example.png')}`)
})()