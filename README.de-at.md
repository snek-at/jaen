<p align="center">
  <a href="https://snek.at/" target="_blank" rel="noopener noreferrer">
    <img src="https://avatars2.githubusercontent.com/u/55870326?s=400&u=c6c7f06305ddc94747d474850fde7b2044f53838&v=4" alt="SNEK Logo" height="150">
  </a>
</p>

<h3 align="center">Snek Jaen</h3>

<p align="center">
  Sie befinden sich im offiziellen Jaen Projekt von snek-at.
  Mit Jaen, dem innovativen, attraktiven und offenem CMS Framework für ReactJS.
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

Read this wiki in a different language: [English](https://github.com/snek-at/jaen/blob/docs/update-readme/README.md)

## [](#table-of-contents)Was Sie erwartet
- [💪 Motivation](#-motivation)
    - [Jaen Features](#jaen-features)
    - [Roadmap](#roadmap)
    - [Nachricht um Sie zu inspirieren](#nachricht-um-sie-zu-inspirieren)
    - [Disclaimer](#disclaimer)
- [🚀 Beginne in 5 Minuten zu arbeiten](#-beginne-in-5-minuten-zu-arbeiten)
    - [Vom Template auf GitHub generieren](#vom-template-auf-github-generieren)
    - [Erste Schritte](#erste-schritte)
    - [Optionen fürs Aufsetzen](#optionen-fürs-aufsetzen)
        - [Codespace Setup](#codespace-setup)
        - [Lokales Setup](#lokales-setup)
            - [Fehlerbehebung](#fehlerbehebung)
    - [Editieren](#editieren)
- [💻 Anwendung](#-anwendung)
    - [Übersicht](#übersicht)
        - [Seiten Einstellungen](#seiten-einstellungen)
        - [Felder](#felder)
    - [Seiten Einstellungen](#seiten-einstellungen)
    - [Felder](#felder)
        - [TextField](textfield)
        - [ImageField](#imagefield)
        - [BlockContainer](#blockcontainer)
        - [IndexField](#indexfield)
        - [ChoiceField](#choicefield)
    - [Blöcke](#blöcke)
- [🐞 Wie man einen Bug meldet oder ein Feature beantragt](#-wie-man-einen-bug-meldet-oder-ein-feature-beantragt)
- [🤝 Selbst mitwirken](#-selbst-mitwirken)
- [💚 Danksagung](#-danksagung)
- [💼 Schöpfer](#-schöpfer)
- [🤔 FAQs](#-faqs)
- [:exploding_head: Trivia](#exploding_head-trivia)
- [📝 Urheberrechte und Lizenz](#-copyright-and-license)

## [](#-motivation)💪 Motivation

Ein CMS **sollte nicht** der definierende Teil einer Webapp sein. Auch E-Commerce sollte das nicht, sondern nur Ihr Code.
ERP Integration **sollte** den Entwickler **nicht** dazu zwingen Kurven zu schneiden.

- Jaen **wird Ihr** Nutzererlebnis **nicht** beeinträchtigen.
- Jaen **wird Ihr** Anwendungsdesign **nicht** herausfordern.
- Jaen gibt **Ihnen** die Kontrolle.

Spezialisiert mit gut und genau geführten Dokumentationen für die Schnittstellen.
Flexibel, erweiterbar und Open-Source.

### Jaen Features

* Eine schnelle, attraktive "What you see is what you get" Oberfläche für Editoren
* Die komplette Kontrolle über die Struktur und das Design des Frontends
* Von Natur aus schnell, Zwischenspeicher-freundlich wenn notwendig
* Das StreamField ermutigt flexiblen Inhalt ohne die Struktur zu gefährden
* Unterstützung für Bilder und eingebettete Inhalte
* Dezentralisiertes, kostenloses Hosting über ein verteiltes Netzwerk


### Roadmap
| Feature                       | Fertig | Fast geschafft | Wir arbeiten daran | In Planung |
|-------------------------------|:---:|:---:|:---:|:---:|
| `IndexField`                  | ✅️ |  |  |  |
| `Email Support`               | ✅️ |  |  |  |
| `Fixed parent for IndexField` | ✅️ |  |  |  |
| `TextField`                   | ✅️ |  |  |  |
| `Dynamic Routes`              | ✅️ |  |  |  |
| `ImageField`                  | ✅️ |  |  |  |
| `BlockContainer`              | ✅️ |  |  |  |
| `ChoiceField`                 | ✅️ |  |  |  |
| `Gatsby`                      | ✅️ |  |  |  |
| `PdfField`                    |  | ✅️ |  |  |
| `LinkField`                   |  | ✅️ |  |  |
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

Nichts für schwache Nerven. Wenn Sie sich dazu entscheiden Jaen zu nutzen, könnten Sie einige Kratzer abbekommen.

## [](#-beginne-in-5-minuten-zu-arbeiten)🚀 Beginne in 5 Minuten zu arbeiten

### Vom Template [auf GitHub generieren](https://github.com/snek-at/jaen-template/generate)
| Vom Template generieren | Wichtig ist, dass das Repository öffentlich ist und, dass Sie nicht alle Branches inkludieren |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124399008-16b7d780-dd19-11eb-84bb-769462d5440e.png) | ![image](https://user-images.githubusercontent.com/83394650/124401575-6c48b000-dd2a-11eb-8316-7f583e5e98d7.png) |

### Erste Schritte

Der `GITHUB_TOKEN`hat Limitierungen für das erste Deployment. Also müssen Sie den GitHub Pages Branch in der Einstellungsseite Ihres Repositorys auswählen. Danach müssen Sie den Anweisungen, die in den Bildern unter diesem Text gezeigt werden, folgen.

| Erstes Aufsetzen fehlgeschlagen | Gehen sie zu Ihrem Pages einstellungs Tab |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124398796-ecb1e580-dd17-11eb-9f06-64d73eb2d4d9.png) | ![image](https://user-images.githubusercontent.com/83394650/124398815-0ce1a480-dd18-11eb-9aef-9d8a3797008b.png) |

| Branch auswählen | Erneutes erfolgreiches Aufsetzen |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124398825-1408b280-dd18-11eb-985f-f28de94b8888.png) | ![image](https://user-images.githubusercontent.com/83394650/124398968-d3f5ff80-dd18-11eb-8f17-ee2d92900014.png) |

### Optionen fürs Aufsetzen
Wir empfehlen [Visual Studio Code](https://github.com/microsoft/vscode) als Entwickerumgebung, entweder Lokal oder in einem Codespace.

#### Codespace Setup

Der einfachste Weg ist die Nutzung eines GitHub [Codespace](https://github.com/features/codespaces) (in der Beta). Erstellen Sie einfach einen Codespace vom Code Menü. Warten Sie bis der Codespace fertig aufgesetzt ist und öffnen Sie ein Konsolenfenster (Strg-\`, Steuerung-Backquote) und:

- Erstellen Sie eine .env-Datei und setzen Sie eine PUBLIC_URL
- Starten Sie die Seite lokal mit `yarn start`
- Oder kompilieren Sie eine lokale Kopie mit `yarn run build`

#### Lokales Setup
Wenn Sie sich dazu entscheiden ein lokales Setup zu verwenden, stellen Sie sicher, dass Sie die folgenden Schritte beachten:

- Nutzen Sie `yarn install` um die Abhängigkeiten zu installieren
- Starten Sie die Seite lokal mit `yarn start`
- Oder kompilieren Sie eine lokale Kopie mit `yarn run build`

Die Demoseite ist nun unter <http://localhost:8000/> verfügbar.

#### Fehlerbehebung

- Dieses Repository wird mit yarn getestet. Wenn Sie npm verwenden, könnten unerwartete Fehler auftreten.

Wenn Sie während des Aufsetzen auf andere Probleme stoßen, bitten wir Sie darum, Ihr Problem [zu melden](https://github.com/snek-at/jaen/issues), sodass wir die Dokumentation verbessern können.

#### Editieren

Um Ihre Seite zu editieren müssen Sie sich beim CMS anmelden.<br />
Der Standardnutzer hierfür ist **snekman** und das Passwort **ciscocisco**.

## [](#-anwendung)💻 Anwendung

### Übersicht

#### Seiten Einstellungen
| Parameter                     | Typ       | Beschreibung | Wiki | Tutorial |
|-------------------------------|:----------:|-------------|:----:|:--------:|
| `TemplateName`             	| string     | Der TemplateName definiert den Namen Ihrer Seite im CMS. |  |  |

#### Felder
| Feld                         | Parameter | Beschreibung | Wiki | Tutorial |
|-------------------------------|------------|-------------|:----:|:--------:|
| `TextField`             | fieldName <br/> initValue <br/> rtf | Ein TextField wird genutzt um editierbare Texte auf Ihre Seite hinzuzufügen. | [✅️](https://github.com/snek-at/jaen/wiki/TextField_ger-at) |  |
| `ImageField`                  | fieldName <br/> initValue | Das ImageField muss genutzt werden, wenn Sie Bilder auf Ihrer Seite brauchen. | [✅️](https://github.com/snek-at/jaen/wiki/ImageField_ger-at) |  |
| `BlockContainer`                 | name <br/> reverseOrder <br/> blocks <br/> wrap <br/> wrapProps | Ein StreamField bietet Ihnen die Möglichkeit mehrere React-Components sooft wie Ihnen beliebt zu wiederholen. | [✅️](https://github.com/snek-at/jaen/wiki/BlockContainer_ger-at) |  |
| `IndexField`                  | fieldName <br/> fixedSlug <br/> onRender | Das IndexField ist dafür da Links und Blöcke zu bauen, die Daten von Subseiten benötigen. <br /> Mit dem fixedSlug Parameter können Sie entscheiden von welcher Seite Sie die Subseiten verwenden wollen. | [✅️](https://github.com/snek-at/jaen/wiki/IndexField_ger-at) |  |
| `ChoiceField` | fieldName <br/> options <br/> initValue <br/> onRender <br/> onRenderPopover | Mithilfe des ChoiceFields können Sie React-Components bauen und den Administrator der Webseite entscheiden lassen, welchen davon er gerade braucht. Dafür haben Sie zwei Möglichkeiten. Wenn Sie alle Ihre Komponenten immer anzeigen wollen und z.B. nur die Farbe des aktiven ändern wollen oder Sie ein Boolean Verhalten benötigen, können Sie dem onRenderPopover ein null als Wert geben und die Auswahl im onRender definieren. Wenn aber nur einer Ihrer Komponenten angezeigt werden sollte können Sie ein selbst definiertes Popover in onRenderPopover dafür schreben. |  [✅️](https://github.com/snek-at/jaen/wiki/ChoiceField_ger-at) |  |


### Page Settings
```javascript
import {JaenTemplate} from '@snek-at/jaen-pages/src/types'

const HomePage: JaenTemplate = () => {...}

HomePage.TemplateName = 'HomePage'

export default HomePage
```

jaen-config.js
```javascript
module.exports = {
  remote: 'snek-at/jaen-template',
  plugins: {
    pages: {
      resolve: require('@snek-at/jaen-pages/jaen-register'),
      templates: [require('./src/templates/SamplePage.tsx')]
    }
  }
}
```
gatsby-config.js
```javascript
const path = require('path')

const siteMetadata = require('./site-metadata')

module.exports = {
  siteMetadata,
  plugins: [
    '@snek-at/jaen',
    {
      resolve: '@snek-at/jaen-pages',
      options: {
        templates: {
          SamplePage: path.resolve('src/templates/SamplePage.tsx')
        }
      }
    }
  ]
}
```
### Fields
Felder sind die Datenblöcke, die Sie verwenden können um Ihre React Apps für den Endnutzer bearbeitbar zu gestalten.
Die Namen der Felder müssen auf der jeweiligen Seite einzigartig sein.
Es wird empfohlen, aussagekräftige Namen zu nutzen.

#### TextField

Mithilfe des TextFields können Sie editierbare RichTextFields (`rtf={true}`) oder ebenfalls editierbare SimpleTextFields (`rtf={false}`) auf Ihre Webseite bringen.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/TextField_ger-at)</div>

```javascript
import {fields, JaenTemplate} from '@snek-at/jaen-pages'

const HomePage: JaenTemplate = () => {
  return(
    <fields.TextField 
      fieldName="hometext"
      initValue="<p>Your text</p>"
      rtf={true}
    />
  )
}

HomePage.TemplateName="HomePage"
export default HomePage

```

#### ImageField

Zum Einbetten von Bildern können Sie das ImageField nutzen. <br />
Es funktioniert, indem ein Bild, welches auf der IPFS gespeichert wird, auf der Seite eingebettet wird.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/ImageField_ger-at)</div>

```javascript
import {fields, JaenTemplate} from '@snek-at/jaen-pages'

const HomePage: JaenTemplate = () => {
  return(
    <fields.ImageField 
      fieldName="homeimage"
      initValue={{src: 'https://your.source', alt: 'homeimage', title: 'homeimage'}}
    />
  )
}

export default HomePage
```


#### BlockContainer

Der BlockContainer ermöglicht es Ihnen, editierbare Blocks in Ihre Seite einzubauen und diese so oft wie gewünscht wiederzuverwenden. Mit dem Wrap Parameter ist es Ihnen ermöglicht einen Chakra UI Wrap um die Blöcke zu setzen und wrapProps erlaubt das bestimmen der Parameter des Wraps. Um dieses Feld zu nutzen müssen Sie einen Block bauen.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/BlockContainer_ger-at)</div>

```javascript
import {BlockContainer, JaenTemplate} from '@snek-at/jaen-pages'
import {CardBlock} from '...'

const HomePage: JaenTemplate = () => {
  return (
    <div style={{width: '50%'}}>
      <BlockContainer
        reverseOrder={false}
        name="home-blockcontainer"
        blocks={[CardBlock]}
	wrap={true}
	wrapProps={{justify: 'center', spacing: '5'}}
      />
    </div>
  )
}

HomePage.TemplateName = 'HomePage'

export default HomePage
```
##### Chakra UI Wrap Beispiel

Dieses Beispiel zeigt fünf farbige Quadrate an, die untereinander einen Abstand von 1 rem haben, die in einem Flex sind, das in eine neue Zeile geht, wenn die Quadrate mehr Platz benötigen als das Browserfenster hat und die zentriert sind.

```javascript
import {Wrap, Box} from '@chakra-ui/react'
import {fields} from '@snek-at/jaen-pages'


const Component = () => {
  return(
    <Wrap spacing="1rem" justify="center">
      <Box boxSize="300px" bg="red"/>
      <Box boxSize="300px" bg="teal"/>
      <Box boxSize="300px" bg="orange"/>
      <Box boxSize="300px" bg="blue"/>
      <Box boxSize="300px" bg="green"/>
    </Wrap>
  )
}

```

#### IndexField
Wenn Sie einen Link auf die Unterseiten Ihrer Seite brauchen können Sie das IndexField verwenden. Der fixedSlug Parameter wird nicht gefordert. Standardmäßig wird die Seite, auf welcher sich das IndexField befindet, dafür genutzt. onRender erlaubt Ihnen die React-Components, die die Daten oder den Link der Unterseiten enthalten, zu bauen.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/IndexField_ger-at)</div>

```javascript
import {fields, JaenTemplate} from '@snek-at/jaen-pages'

const HomePage: JaenTemplate = () => {
  return (
    <fields.IndexField
      fieldName="home-indexfield"
      fixedSlug={'pageId'}
      onRender={(page) => {
        return(
	  [...]
	}}
    />
  )
}

HomePage.TemplateName = 'HomePage'

export default HomePage
```

#### ChoiceField

Mithilfe des ChoiceFields können Sie React-Components bauen und den Administrator der Webseite entscheiden lassen, welchen davon er gerade braucht. Dafür haben Sie zwei Möglichkeiten. Wenn Sie alle Ihre Komponenten immer anzeigen wollen und z.B. nur die Farbe des aktiven ändern wollen oder Sie ein Boolean Verhalten benötigen, können Sie dem onRenderPopover ein null als Wert geben und die Auswahl im onRender definieren. Wenn aber nur einer Ihrer Komponenten angezeigt werden sollte können Sie ein selbst definiertes Popover in onRenderPopover dafür schreben.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/ChoiceField_ger-at)</div>


```javascript
import {fields, JaenTemplate} from '@snek-at/jaen-pages'

const HomePage: JaenTemplate = () => {
  return(
    <fields.ChoiceField 
      fieldName="home-choice"
      options={[...]}
      onRenderPopover={(selection, options, select) => {
        return [...]
      }}
      onRender={(selection, options, onSelect, isEditing) => {
        return [...]
      }}
    />
  )
}

HomePage.TemplateName = 'HomePage'

export default HomePage

```

### Blöcke
Der Block ist der Eckstein des StreamFields. Mit seiner Hilfe können Sie React-Componenten bauen, welche im StreamField so oft wie gewünscht wiederholt werden können. In Blöcken können Sie alle verfügbaren Jaen Felder verwenden.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/Blocks_ger-at)</div>

```javascript
import {JaenBlock, fields} from '@snek-at/jaen-pages'

const CardBlock: JaenBlock = () => {
  return (
    <div className="card">
      <h1>
      	<fields.TextField 
      	  fieldName="blocktext"
	  initValue="<p>this is your heading</p>"
	  rtf={false}
	/>
      </h1>
      <fields.ImageField 
        fieldName="blockimage"
	initValue={{src: 'https://your.source', alt: 'yourAlt'}}
	style={{width: '300px', heigth: '180px'}}
      />
    </div>
  )
}

CardBlock.BlockName = 'CardBlock'
CardBlock.BlockDisplayName = 'Card'

export default CardBlock
```


## [](#-wie-man-einen-bug-meldet-oder-eine-neuerung-beantragt)🐞 Wie man einen Bug meldet oder ein Feature beantragt

Haben Sie einen Bug gefunden oder haben Sie eine Idee für ein neues Feature? Bitte sehen Sie vorher in den offenen und geschlossenen Issues nach, ob Ihr Problem vielleicht bereits behandelt wurde.
Wenn Sie den Bug oder die Idee darin nicht finden, [öffnen Sie bitte ein neues Issue](https://github.com/snek-at/jaen/issues/new/choose).

## [](#-selbst-mitwirken)🤝 Selbst mitwirken
![GitHub letzter Commit](https://img.shields.io/github/last-commit/snek-at/jaen)
![GitHub Issues](https://img.shields.io/github/issues-raw/snek-at/jaen)
![GitHub geschlossene Issues](https://img.shields.io/github/issues-closed-raw/snek-at/jaen?color=green)

Bitte lesen Sie unsere
[Contibution Guidlines](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.md).
Darin werden Sie die Anleitungen zum Öffnen von Issues, die Code Standards und Notizen zur Entwicklung finden.

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
      <a href="https://github.com/petute">Daniel<br/> Petutschnigg</a>
    </td>
  </tr>
</table>

## [](#-faqs)🤔 FAQs
**Q:** Was bedeuten die Kategorien der Roadmap?
* Fertig - Hoffentlich gefällt Ihnen das Feature. Gerne können Sie über Feedback oder Verbesserungsvorschläge berichten!
* Fast geschafft - Wir sind dabei die letzten Änderungen vorzunehmen. Die Features in dieser Kategorie können in den nächsten zwei bis vier Wochen erwartet werden.
* Wir arbeiten daran - Die Entwicklung hat gestartet. Wir arbeiten daran, es so schnell wie möglich zu vervollständigen.
* In Planung - Wir evaluieren das Feature. Dies kann bedeuten, dass wir schon Designen oder dass wir noch darüber nachdenken wie es implementiert werden könnte. Diese Phase ist ein guter Zeitpunkt zum Einbringen von Ihren Ideen. 

**Q:** Warum sind auf der Roadmap keine Termine?

**A:** Auf der Roadmap sind keine Termine, da wir wissen, dass sich die Umstände ändern können und wir nehmen uns den Spielraum, Sicherheitsprobleme zu lösen oder Nutzer zu untersützen. Manchmal müssen wir daher unsere Prioritäten ändern, wollen aber gerne Enttäuschungen vermeiden.

**Q:** Wie kann ich eine Rückmeldung hinterlassen oder mehr Informationen erhalten?

**A:** Bitte öffnen Sie ein Issue! Wenn das Issue einen Bug oder ein Sicherheitsproblem betrifft, beachten Sie bitte die oben stehnden Anleitung.

**Q:** Wie kann ich ein Feature für die Roadmap beantragen?

**A:** Bitte öffnen Sie ein Issue! Sie können [hier](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.MD) nachlesen was beim mitwirken zu beachten ist. Issues von der Community werden mit dem Tag "Proposed" gekennzeichnet und werden vom Team überprüft.

## [](#-trivia):exploding_head: Trivia
#### Name:
In Österreich ist der erste Monat des Jahres der Jänner. Da wir in diesem Monat mit der Arbeit an Jaen begonnen haben, bekam das Projekt seinen Namen.
#### Aussprache:
Jaen wird entweder wie (Jän)ner [ˈjɛn] oder wie (Jan)uary [ˈdʒæn] ausgesprochen.
#### Passwort:
Das Standardpasswort ist **ciscocisco**. Der Ursprung hiervon liegt in unserer Schulzeit. In der Schule für Netzwerktechnik, die der Großteil des Gründerteams besuchte, war in den Cisco-Kursen das Passwort stets ciscocisco.
#### Releases:
Jeder unserer Releases schmückt sich mit einem Lied. Hoffentlich haben Sie Spaß damit.
#### Maskottchen:
Das inoffizielle Maskottchen für Jaen ist eine junge Frau mit einer E-Gitarre.

### <3

## [](#-urheberrechte-und-lizent)📝 Urheberrechte und Lizenz

![GitHub Repository Lizenz](https://img.shields.io/badge/license-EUPL--1.2-blue)

Das Nutzen dieses Source-Codes wird von der EUPL-1.2 Lizenz bestimmt sie ist in der LICENSE Datei unter https://snek.at/license zu finden.

<!--
  SPDX-FileCopyrightText: Copyright © 2021 snek.at
  SPDX-License-Identifier: EUPL-1.2
  Use of this source code is governed by an EUPL-1.2 license that can be found
  in the LICENSE file at https://snek.at/license
-->
