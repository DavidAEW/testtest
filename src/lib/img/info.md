## Verwendung von Logos

Hier sind einige Logos, die ich erstellt habe. Fühlen Sie sich frei, sie zu verwenden oder neue hinzuzufügen. Um die Bilder in einer anderen Datei zu verwenden, müssen Sie das Bild zuerst wie folgt importieren:

```javascript
import logoWeiss from '$lib/img/logoWeiss.png';
```

Da die Bilder im "lib"-Verzeichnis gespeichert sind, müssen Sie nicht den gesamten Pfad angeben. "$lib" funktioniert überall.

Nachdem Sie das Bild importiert haben, können Sie es frei in der Datei verwenden, in der Sie es importiert haben. Ein Beispiel dafür ist:

```html
<img class="w-40 ml-5" src={logoWeiss} alt="Logo" />
```

Wenn Sie das <img/>-Tag nicht verwenden möchten, können Sie auch das Avatar-Element aus der Skeleton-Bibliothek verwenden. Dies würde folgendermaßen aussehen:

```html
<Avatar src={logoWeiss} class="w-9 h-9 mr-6 rounded-full" />
```

Vergessen Sie dabei nicht die Importanweisung:

```javascript
import { Avatar } from '@skeletonlabs/skeleton';
```
