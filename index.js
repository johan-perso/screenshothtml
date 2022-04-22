// Importer puppeteer
const puppeteer = require('puppeteer');

// Préparer une variable contenant un navigateur
var browser;
var browserLastUse;

// Fonction pour prendre une capture d'écran d'un code HTML
/**
 * Capturer du code HTML
 * 
 * ```js
 * const screenshot = require('screenshothtml');
 * var image = await screenshot({
 * 	html: '<h1>Hello world</h1>'
 * });
 * fs.writeFileSync('test.png', image);
 * ```
 * 
 * @param   {object}   options                   Options
 * @param   {string}   options.html              Code HTML à capturer
 * @param   {number}   options.maxTimeout        Temps maximum (en ms) à attendre avant que la page finisse de charger
 * @param   {boolean}  options.closeAtEnd        Fermer le navigateur à la fin de la capture
 * @param   {number}   options.viewportWidth     Largeur du viewport 
 * @param   {number}   options.viewportHeight    Hauteur du viewport 
*/
async function captureHTML(options= { html: `<h1>Aucun code HTML donné :(</h1>`, maxTimeout: 10000, closeAtEnd: true, viewportWidth: 1920, viewportHeight: 1080 }) {
	// Si il n'y a pas de navigateur
	if(!browser){
		// L'initialiser
		browser = await puppeteer.launch({
			headless: true,
			waitForInitialPage: true
		});

		// Le fermer une minute après si il est n'est pas utilisé
		browserLastUse = Date.now();
		var interval = setInterval(() => {
			if(Date.now() - browserLastUse > 60000){
				if(browser) browser.close();
				browser = null;
				clearInterval(interval);
			}
		}, 30000);
	}

	// Ouvrir une nouvelle page
	const page = await browser.newPage();

	// Définir une taille de page
	await page.setViewport({
		width: options.viewportWidth || 1920,
		height: options.viewportHeight || 1080
	});

	// Définir le code HTML
	if(options?.html?.startsWith('url:')) await page.goto(options?.html?.replace('url:',''), { waitUntil: 'networkidle0', timeout: options?.maxTimeout });
	else await page.setContent(options?.html, { waitUntil: 'networkidle0', timeout: options?.maxTimeout });

	// Faire une capture d'écran
	const image = await page.screenshot();

	// Fermer la page
	await page.close();

	// Si on doit fermer le navigateur
	if(options?.closeAtEnd){
		if(browser) browser.close();
		browser = null;
		clearInterval(interval);
	}

	// Retourner l'image
	return image;
}

// Exporter la fonction
module.exports = captureHTML
module.exports.version = require('./package.json').version;
