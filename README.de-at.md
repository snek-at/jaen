<p align="center">
  <a href="https://snek.at/" target="_blank" rel="noopener noreferrer">
    <img src="https://avatars2.githubusercontent.com/u/55870326?s=400&u=c6c7f06305ddc94747d474850fde7b2044f53838&v=4" alt="SNEK Logo" height="150">
  </a>
</p>

<h3 align="center">Snek Jaen Template</h3>

<p align="center">
  Sie befinden sich im offiziellen Jaen Template von snek-at.
  Mit Jaen, dem innovativen, attraktiven gratis CMS Framework für ReactJS.
  <br>
  <br>
  <cite>"Nur eine leere Schüssel kann man füllen."</cite> - Lao Tzu
  <br>
  <br>
  <a href="https://github.com/snek-at/jaen/issues/new?template=bug_report.md">Melde einen Bug</a>
  ·
  <a href="https://github.com/snek-at/jaen/issues/new?template=feature_request.md">Beantrage ein Feature</a>
  ·
  <a href="https://www.github.com/snek-at/jaen/wiki">Dokumentation</a>
  <br>
  <br>
  <a href="https://www.codacy.com/gh/snek-at/jaen/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=snek-at/jaen&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/bb3d984d38704860ba7ad800d319b8c4" />
  </a>
</p>

## [](#table-of-contents)What’s In This Document
- [💪 Motivation](#-motivation)
    - [Jaen Features](#jaen-features)
    - [Roadmap](#roadmap)
    - [Nachricht um Sie zu inspirieren](#nachricht-um-sie-zu-inspirieren)
    - [Warnhinweis](#warnhinweis)
- [🚀 Beginne in 5 Minuten zu arbeiten](#-beginne-in-5-minuten-zu-arbeiten)
    - [Vom Template auf Github generieren](#vom-template-auf-github-generieren)
    - [Erste Schritte](#erste-schritte)
    - [Optionen fürs Aufsetzen](#optionen-fürs-aufsetzen)
        - [Codespace Setup](#codespace-setup)
        - [Lokales Setup](#lokales-setup)
            - [Fehlerbehebung](#fehlerbehebung)
    - [Editieren](#editieren)
- [💻 Anwendung](#-anwendung)
    - [Übersicht](#übersicht)
        - [App Einstellungen](#app-einstellungen)
        - [Seiten Einstellungen](#seiten-einstellungen)
        - [Felder](#felder)
    - [App Einstellungen](#app-einstellungen)
    - [Seiten Einstellungen](#seiten-einstellungen)
    - [Felder](#felder)
        - [SimpleTextField](#simpletextfield)
        - [SimpleRichTextField](#simplerichtextfield)
        - [SimpleImageField](#simpleimagefield)
        - [SimplePdfField](#simplepdffield)
        - [StreamField](#streamfield)
        - [IndexField](#indexfield)
    - [Blöcke](#blöcke)
- [🐞 Wie man einen Bug meldet oder eine Neuerung beantragt](#-wie-man-einen-bug-meldet-oder-eine-neuerung-beantragt)
- [🤝 Selbst mitwirken](#-selbst-mitwirken)
- [💚 Danksagung](#-danksagung)
- [💼 Schöpfer](#-schöpfer)
- [🤔 FAQs](#-faqs)
- [📝 Urheberrechte und Lizenz](#-copyright-and-license)

## [](#-motivation)💪 Motivation

Ein CMS **sollte nicht** der definierende Teil einer Webapp sein. Auch Ecommerce sollte das nicht noch etwas anderes als Ihr Code.
ERP Integration **sollte** den Entwickler **nicht** dazu zwingen Kurven zu schneiden.

- Jaen **wird Ihr** Nutzererlebnis **nicht** beeinträchtigen.
- Jaen **wird Ihr** Anwendungsdesign **nicht** herausfordern.
- Jaen gibt **Ihnen** die Kontrolle.

One thing and one thing only with clean and well documented interfaces.
Customizable, extensible and open-source.

Spezialisiert mit gut und genau geführten Dokumentationen für die Schnittstellen.

### Jaen Features

* Eine schnelle, attraktive "What you see is what you get" Oberfläche für Editoren
* Die komplette Kontrolle über die Struktur und das Design des Frontends
* Von Natur aus schnell, Zwischenspeicher freundlich wenn man es braucht
* Das StreamField ermutigt flexiblen Inhalt ohne die Struktur zu gefährden
* Unterstützung für Bilder und eingebettete Inhalte
* Dezentralisiertes gratis Hosting über ein verteiltes Netzwerk


### Roadmap
| Feature                       | Fertig | Fast geschafft | Wir arbeiten daran | In Planung |
|-------------------------------|:---:|:---:|:---:|:---:|
| `IndexField`                  | ✅️ |  |  |  |
| `RichTextField`               | ✅️ |  |  |  |
| `Email Support`               | ✅️ |  |  |  |
| `Fixed parent for IndexField` | ✅️ |  |  |  |
| `TextField`                   | ✅️ |  |  |  |
| `Dynamic Routes`              | ✅️ |  |  |  |
| `PdfField`                    | ✅️ |  |  |  |
| `ImageField`                  | ✅️ |  |  |  |
| `StreamField`                 | ✅️ |  |  |  |
| `LinkField`                   |  | ✅️ |  |  |
| `Gatsby`                      |  |  | ✅️ |  |
| `Converter (HELMUT)`          |  |  |  | ✅️ |
| `Smart Converter (SMARTMUT)`  |  |  |  | ✅️ |
| `E-Commerce`                  |  |  |  | ✅️ |
| `User Management`             |  |  |  | ✅️ |
| `Email Templates`             |  |  |  | ✅️ |
| `Development Tools`           |  |  |  | ✅️ |
| `Snek Editor`                 |  |  |  | ✅️ |
| `YT Tutorials`                |  |  |  | ✅️ |

#### Nachricht um Sie zu inspirieren
In einem Hamsterrad zu rennen ist nicht inspirierend.

#### Disclaimer
Not for crybabies. Do not touch if you are afraid of being scratched a little.

Nichts für schwache Nerven. 

## [](#-beginne-in-5-minuten-zu-arbeiten)🚀 Beginne in 5 Minuten zu arbeiten

### Vom Template auf [Github generieren](https://github.com/snek-at/jaen-template/generate)
| Vom Template generieren | Wichtig ist, dass das Repository öffentlich ist und, dass Sie nicht alle Branches inkludieren |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124399008-16b7d780-dd19-11eb-84bb-769462d5440e.png) | ![image](https://user-images.githubusercontent.com/83394650/124401575-6c48b000-dd2a-11eb-8316-7f583e5e98d7.png) |

### Erste Schritte

Der `GITHUB_TOKEN`hat Limitierungen für das erste Deployment. Also müssen Sie den Github Pages branch in der Einstullungsseite Ihres Repositorys auswählen. Danach müssen Sie den Anweisungen, die in den Bildern unter diesem Text gezeigt werden, befolgen.

| Erstes Aufsetzen fehlgeschlagen | Gehen sie zu Ihrem Pages einstellungs Tab |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124398796-ecb1e580-dd17-11eb-9f06-64d73eb2d4d9.png) | ![image](https://user-images.githubusercontent.com/83394650/124398815-0ce1a480-dd18-11eb-9aef-9d8a3797008b.png) |

| Branch auswählen | Erneutes erfolgreiches Aufsetzen |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124398825-1408b280-dd18-11eb-985f-f28de94b8888.png) | ![image](https://user-images.githubusercontent.com/83394650/124398968-d3f5ff80-dd18-11eb-8f17-ee2d92900014.png) |

### Optionen fürs Aufsetzen
Wir empfehlen [VSCode](https://github.com/microsoft/vscode) als Entwickerumgebung entweder Lokal oder in einem Codespace.

#### Codespace Setup
The easiest method is to use a GitHub [Codespace](https://github.com/features/codespaces) (in beta). Just create a GitHub Codespace from the Code menu. Wait for the Codespace to complete provisioning. When the Codespace has completed provisioning open a terminal window (Ctrl-`, Control-backquote) and:

Der einfachste Weg ist die Nutzung eines GitHub [Codespace](https://github.com/features/codespaces) (in der Beta). Erstellen Sie einfach einen Codespace vom Code Menü. Warten Sie bis der Codespace fertig Aufgesetzt ist und öffnen Sie ein Konsolenfenster (Strg-`, Steuerung-Backquote) und:

- Fügen Sie die [GitHub npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) hinzu `npm login --registry=https://npm.pkg.github.com`
- Erstellen sie eine .env und setzen Sie eine PUBLIC_URL
- Starten sie die Seite Lokal mit `npm start`
- Oder kompilieren sie eine lokale Kopie mit `npm run build`

#### Lokales Setup
Wenn Sie sich dazu entscheiden ein lokales Setup zu verwenden, stellen Sie sicher, dass Sie die folgenden Schritte beachten:

- Fügen Sie die [GitHub npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) hinzu `npm login --registry=https://npm.pkg.github.com`
- Nutzen Sie `npm install` um die Abhängigkeiten zu installieren
- Starten sie die Seite Lokal mit `npm start`
- Oder kompilieren sie eine lokale Kopie mit `npm run build`

Die Demoseite ist nun unter <http://localhost:3000/> verfügbar.

#### Fehlerbehebung

Wenn Sie beim Aufsetzen des Templates Probleme haben können Sie die folgenden Dinge probieren:

- node-sass nutzt Node15. Wenn Sie Node16 verwenden können Sie nvm nutzen um mehrere Node Versionen zu Installieren.

Wenn Sie während des Aufsetzen auf andere Probleme stoßen bitten wir Sie darum Ihr Problem [zu melden](https://github.com/snek-at/jaen/issues), sodass wir die Dokumentation verbessern können.

#### Editieren

Um Ihre Seite zu editieren müssen Sie sich beim CMS anmelden.<br />
Der Standardnutzer hierfür ist **snekman** und das Passwort **ciscocisco**.

## [](#-anwendung)💻 Anwendung

### Übersicht

#### App Einstellungen
| Field                         | Parameter | Beschreibung | Wiki | Tutorial |
|-------------------------------|------------|-------------|:----:|:--------:|
| `CMSProvider`             	| settings <br/> pages | Der CMSProvider registriert die Jaen Applikation und ermöglicht es Daten(z.B. Felder) zwischen Jaen und den Seiten zu übertragen. |  |  |

#### Seiten Einstellungen
| Feld                         | Typ       | Beschreibung | Wiki | Tutorial |
|-------------------------------|:----------:|-------------|:----:|:--------:|
| `PageType`             	| string     | Der PageType definiert den Namen Ihrer Seite im CMS. |  |  |
| `ChildPages`         		| [Pages]    | In ChildPages setzen Sie fest welche Arten von Seiten ein PageType als Unterseiten haben kann. |  |  |

#### Felder
| Feld                         | Parameter | Beschreibung | Wiki | Tutorial |
|-------------------------------|------------|-------------|:----:|:--------:|
| `SimpleTextField`             | name <br/> | Ein SimpleTextField wird genutzt um kurze editierbare Texte auf Ihre Seite hinzuzufügen. | [✅️](https://github.com/snek-at/jaen/wiki/SimpleTextField) |  |
| `SimpleRichTextField`         | name <br/> | SimpleRichtextField wird genutzt um größere RichText Blöcke auf Ihre Seite zu bringen. | [✅️](https://github.com/snek-at/jaen/wiki/SimpleRichTextField) |  |
| `SimpleImageField`            | name <br/> | Mit dem SimpleImageField können Sie ein Bild auf Ihrer Webseite einbetten. | [✅️](https://github.com/snek-at/jaen/wiki/SimpleImageField) |  |
| `ImageField`                  | fieldOptions <br/> imageClassName <br/> imageStyle | Das ImageField muss genutzt werden, wenn Sie Bilder auf Ihrer Seite brauchen, die gestylt werden müssen. Hiefür haben Sie die Möglichkeiten, einen className mit dem imageClassName Parameter zu setzen oder Sie stylen das Bild direkt mit dem imageStyle. | [✅️](https://github.com/snek-at/jaen/wiki/ImageField) |  |
| `SimplePdfField`            	| name <br/> pdfStyle | Wenn Sie auf Ihrer Seite eine PDF einbetten wollen können Sie dies mit dem SimplePdfField. | [✅️](https://github.com/snek-at/jaen/wiki/SimplePdfField) |  |
| `StreamField`                 | name <br/> reverseOrder <br/> blocks| Ein StreamField bietet Ihnen die Möglichkeit mehrere React-Components sooft wie Ihnen beliebt zu wiederholen. | [✅️](https://github.com/snek-at/jaen/wiki/StreamField) |  |
| `IndexField`                  | fixedSlug <br/> outerElement <br/> renderItem | Das IndexField ist dafür da Links und Blöcke zu bauen, die Daten von Subseiten benötigen. <br /> Mit dem fixedSlug Parameter können Sie entscheiden von welcher Seite Sie die Subseiten verwenden wollen. | [✅️](https://github.com/snek-at/jaen/wiki/IndexField) |  |

### App Settings
```javascript
import {CMSProvider} from '@snek-at/jaen'

import {HomePage} from '...'
import ImprintPage from '...'

const App: React.FC = () => {
  return (
    <div style={{margin: 150}}>
      <CMSProvider
        settings={{gitRemote: process.env.REACT_APP_JAEN_GIT_REMOTE}}
        pages={[HomePage, ImprintPage]}></CMSProvider>
    </div>
  )
}
)
```

### Page Settings
```javascript
import ImprintPage from '...'

const HomePage: ConnectedPageType = () => {...}

HomePage.PageType = 'HomePage'
HomePage.ChildPages = [ImprintPage]

export default HomePage
```

### Fields
Felde sind die Datenblöcke, die Sie verwenden können um Ihre React Apps für den Endnutzer bearbeitbar zu gestalten.
Die Namen der Felder müssen auf der jeweiligen Seite einzigartig sein.
Es wird empfohlen beschreibende Namen zu nutzen.

#### SimpleTextField

Das SimpleTextField ist einfach zu nutzen. Geben Sie dem Feld einfach einen Namen.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/SimpleTextField)</div>

```javascript
import {SimpleTextField} from '@snek-at/jaen'

const HomePage: ConnectedPageType = () => {
  return (
    <SimpleTextField name="stffield" />
  )
}

[...]

export default HomePage
```

#### SimpleRichTextField 

Auch das SimpleRichTextField ist einfach zu nutzen, da man dem Feld nur einen Namen geben muss. <div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/SimpleRichTextField)</div>

```javascript
import {SimpleRichTextField} from '@snek-at/jaen'

const HomePage: ConnectedPageType = () => {
  return (
    <SimpleRichTextField name="srtffield" />
  )
}

[...]

export default HomePage
```

#### SimpleImageField

Zum einbetten von Bildern können Sie das SimpleImageField nutzen. <br />
Es funktioniert indem ein Bild, das auf der IPFS gespeichert wird, auf der Seite eingebetter wird.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/SimpleImageField)</div>

```javascript
import {SimpleImageField} from '@snek-at/jaen'

const HomePage: ConnectedPageType = () => {
  return (
    <SimpleImageField
      name="siffield"
    />
  )
}

[...]

export default HomePage
```

#### ImageField

Zusätzlich zum Namen, den Sie dem SimpleImageField geben müssen, hat das ImageField auch noch die Möglichkeit das Bild zu stylen indem man einen imageClassName oder einen imageStyle hinzufügt. <div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/ImageField)</div>

```javascript
import {ImageField} from '@snek-at/jaen'

const HomePage: ConnectedPageType = () => {
  return (
    <ImageField
      fieldOptions={{fieldName: "iffield"}}
      imageClassName="iffield"
      imageStyle={{width: '500px', height: '500px', objectFit: 'cover'}}
    />
  )
}

[...]

export default HomePage
```

#### SimplePdfField 

Das SimplePdfField erlaubt es Ihnen eine auf der IPFS gespeicherte PDF-Datei einzubetten.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/SimplePdfField)</div>

```javascript
import {SimplePdfField} from '@snek-at/jaen'

const HomePage: ConnectedPageType = () => {
  return (
     <SimplePdfField name="spffield" pdfStyle={{height: 1000, width: 1000}} />
  )
}

[...]

export default HomePage
```


#### StreamField

Das StreamField ermöglicht es Ihnen editierbare Blocks in Ihre Seite einzubauen und diese sooft wie gewünscht wiederzuverwenden. Um dieses Feld zu nutzen müssen Sie einen Block bauen.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/StreamField)</div>

```javascript
import {StreamField} from '@snek-at/jaen'
import {CardBlock} from '...'

const HomePage: ConnectedPageType = () => {
  return (
    <div style={{width: '50%', display: 'table'}}>
      <StreamField
        reverseOrder={false}
        name={'timeline'}
        blocks={[CardBlock]}
      />
    </div>
  )
}

[...]

export default HomePage
```

#### IndexField

Wenn Sie einen Link auf die Subseiten Ihrer Seite brauchen können Sie das IndexField verwenden. Der fixedSlug Parameter wird nicht gefordert. Standardmäßig wird die Seite auf der das IndexField ist dafür genutzt. Das outerElement ist HTML-Tags der Ihre Links umgiebt und renderItem erlaubt Ihnen die React-Components, die die Daten oder den Link der Subseiten enthalten, zu bauen.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/IndexField)</div>

```javascript
import {IndexField} from '@snek-at/jaen'

const HomePage: ConnectedPageType = () => {
  return (
    <IndexField
      fixedSlug={'home'}
      outerElement={() => <div />}
      renderItem={(item, key, navigate) => (
        <p key={key}>
          Slug: {item.slug} Title: {item.title}{' '}
          <button onClick={() => navigate()}>Goto</button>
        </p>
       )}
    />
  )
}

[...]

export default HomePage
```


### Blöcke
Der Block ist der Eckstein des StreamFields. Mit seiner Hilfe können Sie React-Componenten bauen, die im StreamField sooft wie gewünscht wiederholt werden können.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/Blocks)</div>

```javascript
import {
  BC,
  prepareBlocks,
  ImageField,
  EditableField,
  RichTextField
} from '@snek-at/jaen'

type BlockType = {
  title: string
  extra: string
  text: string
  }

const Block: BC<BlockType> = ({
  fieldOptions,
  streamFieldWidth
}) => {
  const blocks = prepareBlocks<BlockType>(Block, fieldOptions)

  return (
    <>
      <div className="card">
        <h1>{title}</h1>
        {blocks['text']}
        {blocks['image']}
        {blocks['extra']}
      </div>
    </>
  )
}

Block.BlockType = 'Block'
Block.BlockFields = {
  image: ImageField,
  title: EditableField,
  extra: EditableField,
  text: RichTextField
}

export default Block
```


## [](#-wie-man-einen-bug-meldet-oder-eine-neuerung-beantragt)🐞 Wie man einen Bug meldet oder eine Neuerung beantragt

Haben Sie einen Bug gefunden oder haben Sie eine Idee für einen neuen Bestandteil? Bitte sehen Sie zuvor in den offenen und geschlossenen Issues nach, ob Ihr Problem schon behandelt wurde.
Wenn Sie den Bug oder die Idee darin nicht finden [öffnen Sie bitte ein neues Issue](https://github.com/snek-at/jaen/issues/new/choose).

## [](#-selbst-mitwirken)🤝 Selbst mitwirken
![GitHub letzter Commit](https://img.shields.io/github/last-commit/snek-at/jaen)
![GitHub Issues](https://img.shields.io/github/issues-raw/snek-at/jaen)
![GitHub geschlossene Issues](https://img.shields.io/github/issues-closed-raw/snek-at/jaen?color=green)

Bitte lesen Sie unsere
[Contibutions Guidlines](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.md).
Darin werden Sie die Anleitungen zum öffnen von Issues, die Code Standards und Notizen zur Entwicklung finden.

Der Code sollte unserem [Code Guide](https://github.com/snek-at/tonic/blob/master/STYLE_GUIDE.md) entsprechen, der von
[snek-at](https://github.com/snek-at) aktuell gehalten wird.

## [](#-danksagung)💚 Danksagung

Wir haben noch keine externen Entwickler. Um Ihren Namen hier zu sehen, [tragen Sie zu unserem Projekt bei](#-sebst-beitragen).

## [](#-schöpfer)💼 Schöpfer

<table border="0">
    <tr>
	 <td>
      <a href="https://github.com/schettn">
        <img src="https://avatars.githubusercontent.com/schettn?s=100" alt="Avatar schettn">
      </a>
    </td>
    <td>
      <a href="https://github.com/kleberbaum">
        <img src="https://avatars.githubusercontent.com/kleberbaum?s=100" alt="Avatar kleberbaum">
      </a>
    </td>
    <td>
      <a href="https://github.com/kleberbaum">
        <img src="https://avatars.githubusercontent.com/petute?s=100" alt="Avatar petute">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/schettn">Nico Schett</a>
    </td>
    <td>
      <a href="https://github.com/kleberbaum">Florian Kleber</a>
    </td>
    <td>
      <a href="https://github.com/petute">Daniel Petutschnigg</a>
    </td>
  </tr>
</table>

## [](#-faqs)🤔 FAQs
**Q:** Was bedeuten die Roadmap Kategorien?
* Fertig - Hoffentlich haben Sie spaß damit. Hinterlassen Sie uns eine Rückmeldung über Ihre Erfahrungen!
* Fast geschafft - Wir sind dabei die letzten Änderungen vorzunehmen. Die Features in dieser kategorie können in den nächsten 2-4 Wochen erwartet werden.
* Wir arbeiten daran - Die Entwicklung hat gestartet. Wir arbeiten daran es so schnell und gut wie möglich zu vervollständigen.
* In Planung - Wir denken darüber nach. Dies kann bedeuten, dass wir schon designen oder das wir noch darüber nachdenken wie es funktionieren könnte. Diese Phase ist ein guter Zeitpunkt um vorzuschlagen, wie Sie gern ein Feature sehen würden und um Design Ideen einzureichen. 

**Q:** Warum sind auf der Roadmap keine Termine?

**A:** Auf der Roadmap sind keine Termine, da wir wissen, dass sich die Umstände ändern können und wir wollen den Spielraum um Sicherheitsprobleme zu lösen oder Nutzer zu untersützen. Manchmal müssen wir daher unsere Prioritäten ändern und wolen es aber gerne vermeiden Nutzer zu enttäuschen.

**Q:** Wie kann ich eine Rückmeldung hinterlassen oder mehr Information erhalten?

**A:** Bitte öffnen Sie ein Issue! Wenn das Issue einen Bug oder ein Sicherheitsproblem betrifft beachten Sie bitte die oben stehnden Anleitung.

**Q:** Wie kann ich ein Feature für die Roadmap beantragen?

**A:** Bitte öffnen Sie ein Issue! Sie können [hier](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.MD) nachlesen was beim mitwirken zu beachten ist. Issues von der Community werden mit dem Tag "Proposed" gekennzeichnet und werden vom Team überprüft.

## [](#-urheberrechte-und-lizent)📝 Urheberrechte und Lizenz

![GitHub Repository Lizenz](https://img.shields.io/badge/license-EUPL--1.2-blue)

Das nutzen dieses SourceCodes wird von der EUPL-1.2 Lizenz bestimmt sie ist in der LICENSE Datei unter https://snek.at/license zu finden.

<!--
  SPDX-FileCopyrightText: Copyright © 2021 snek.at
  SPDX-License-Identifier: EUPL-1.2
  Use of this source code is governed by an EUPL-1.2 license that can be found
  in the LICENSE file at https://snek.at/license
-->
