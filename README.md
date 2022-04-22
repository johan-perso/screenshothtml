# ScreenshotHTML

ScreenshotHTML permet de faire des captures d'écran d'un code HTML, en utilisant [Puppeteer](https://github.com/puppeteer/puppeteer) (un navigateur basé sur Chromium).

⚠️ Aucune fenêtre de navigateur Puppeteer ne seront visibles en tant qu'application avec interface sur votre appareil.


## Installation

NodeJS 15 *(ou plus récent)* est requis.

Cette librairie ne fonctionne pas pour navigateur.

```bash
npm i screenshothtml
```


## Exemple

Vous pouvez retrouver un exemple dans le dossier `example` du repo.


## Charger une URL plutôt que du code

Au lieu d'insérer du code HTML, vous pouvez charger une URL en remplacant le code par `url:<l'url du site>`.


## Options

```js
var image = await screenshot({ <les options> });
```

| Option         | Type    | Exemple                 | Description                                                                                                    |
|----------------|---------|-------------------------|----------------------------------------------------------------------------------------------------------------|
| html           | string  | `<h1>Hello world!</h1>` | Code HTML à capturer                                                                                           |
| maxTimeout     | int     | `15000                ` | Temps maximum (en ms) à attendre avant que la page finisse de charger                                          |
| closeAtEnd     | boolean | `true                 ` | Fermer le navigateur à la fin de la capture (le laisser ouvert permet de refaire des captures plus rapidement) |
| viewportWidth  | int     | `1600                 ` | Largeur du viewport                                                                                            |
| viewportHeight | int     | `900                  ` | Hauteur du viewport                                                                                            |


## Licence

MIT © [Johan](https://johanstickman.com)
