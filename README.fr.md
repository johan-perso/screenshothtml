###### English version [here](https://github.com/johan-perso/screenshothtml/blob/main/README.md).

# ScreenshotHTML

ScreenshotHTML permet de faire des captures d'écran d'un code HTML, en utilisant [Puppeteer](https://github.com/puppeteer/puppeteer) (un navigateur basé sur Chromium).

⚠️ Aucune fenêtre de navigateur Puppeteer ne seront visibles en tant qu'application avec interface sur votre appareil.


## Installation

NodeJS 14 *(ou plus récent)* est requis.

```bash
# Avec npm
npm i screenshothtml

# Ou avec yarn
yarn add screenshothtml

# Ou avec pnpm
pnpm i screenshothtml
```

Cette librairie ne supporte pas les navigateurs, vous pouvez utiliser [html2canvas](https://html2canvas.hertzen.com/) et [canvas2image](https://github.com/hongru/canvas2image) pour obtenir un résultat similaire.


## Options

```js
var image = await screenshot({ <les options> })
```

| Option             | Type    | Exemple                 | Description                                                                         |
|--------------------|---------|-------------------------|-------------------------------------------------------------------------------------|
| html               | string  | `<h1>Hello world!</h1>` | Code HTML à capturer                                                                |
| maxTimeout         | int     | `15000                ` | Temps maximum (en ms) à attendre avant que la page finisse de charger               |
| viewportWidth      | int     | `1600                 ` | Largeur du viewport                                                                 |
| viewportHeight     | int     | `900                  ` | Hauteur du viewport                                                                 |
| autoCloseAfter     | int     | `100000               ` | Modifie le temps (en ms) requis avant de fermer le navigateur après une capture     |
| puppeteerArguments | object  | `{headless: false}    ` | Indique des arguments à la [librarie Puppeteer](https://github.com/puppeteer/puppeteer/blob/v13.7.0/docs/api.md#puppeteerlaunchoptions)     |
| waitForDomLoaded   | boolean | `false                ` | Attend que le DOM finisse de charger avant de prendre une capture, [plus d'infos ici](#options-waitfordomloaded) |


## APIs

```js
const screenshot = require('screenshothtml')
```

**Principale :**

`screenshot()`

Effectue une capture d'écran, élement principale de la librairie.

[Options disponibles ici](#options).


**Fermer le navigateur :**

`await screenshot.close()`

Ferme le navigateur manuellement.


**Accéder au navigateur :**

`screenshot.browser`

Retourne le navigateur Puppeteer, tel qu'il est utilisé.


**Dernière capture d'écran :**

`screenshot.browserLastUse`

Retourne la date correspondant à la dernière capture d'écran.


**Arguments Puppeteer :**

`screenshot.puppeteerArgs`

Retourne la liste des arguments passé à Chromium lors de son démarrage, à ne pas confondre avec l'option `puppeteerArguments` qu'est différente.


**Version de ScreenshotHTML :**

`screenshot.version`

Retourne la version utilisée de ScreenshotHTML.


## Exemple

Vous pouvez retrouver des exemple dans le dossier `example` du repo.


## Vitesse

Lorsque la variable d'environnement `SCREENSHOTHTML_SHOW_STATISTICS` est définie, des statistiques de vitesses sont affichés dans le terminal.

> Quelques résultats sur les exemples présents dans ce repo, réalisé sur [mon ordinateur](https://consumer.huawei.com/fr/laptops/matebook-d-15/) (pas vraiment dans les meilleurs moments).

Avec l'option `waitForDomLoaded` sur `false` :
* browserOpen: ~330ms
* pageOpen: ~115ms
* gotoPage: ~990ms
* screenshot: ~310ms
* closePage: ~3ms

Avec l'option `waitForDomLoaded` sur `true` :
* browserOpen: ~220ms
* pageOpen: ~120ms
* gotoPage: ~20ms
* screenshot: ~480ms
* closePage: ~4ms


## Charger une URL plutôt que du code

Au lieu d'insérer du code HTML, vous pouvez charger une URL en remplacant le code par `url:<l'url du site>`. Ceci fonctionne également avec localhost.


## Fermeture du navigateur

Après une capture, le navigateur est automatiquement fermé après 60 secondes, le temps peut être modifié avec l'option `autoCloseAfter` (tout nombre négatif annule la fermeture automatique, et `0` ferme sans attendre).

Le navigateur peut aussi être fermé manuellement avec `close()`.


## Options `waitForDomLoaded`

L'option `waitForDomLoaded` (boolean) permet de décider si le navigateur doit attendre que le DOM soit chargé avant de prendre une capture. Si la valeur est défini sur `false` (ou n'est pas défini), le navigateur utilisera `networkidle0`. Lorsque l'option est activé (`true`), les captures d'écrans sont plus rapides, mais l'importation de certains élements et l'exécutions de certains scripts peuvent être annulés, cela peut être pratique lors d'un chargement de page ne contenant qu'un simple code HTML.


## Licence

MIT © [Johan](https://johanstick.me)
