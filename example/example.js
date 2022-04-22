(async () => {
	// Importer des modules
	const screenshot = require('../index.js');
	const fs = require('fs');
	const path = require('path');

	// Capturer du HTML
	var image = await screenshot({
		html: fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8'), // Code HTML à capturer
		maxTimeout: 15000, // Temps maximum (en ms) à attendre avant que la page finisse de charger
		closeAtEnd: true, // Arrêter le navigateur à la fin de la capture
		viewportWidth: 1600, // Largeur du viewport
		viewportHeight: 900 // Hauteur du viewport
	});

	// Enregistrer l'image
	fs.writeFileSync(path.join(__dirname, 'test.png'), image);

	// Afficher l'image
	console.log(`Image enregistré dans : ${path.join(__dirname, 'test.png')}`);
})();
