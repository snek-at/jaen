<p align="center">
  <a href="https://snek.at/" target="_blank" rel="noopener noreferrer">
    <img src="https://avatars2.githubusercontent.com/u/55870326?s=400&u=c6c7f06305ddc94747d474850fde7b2044f53838&v=4" alt="SNEK Logo" height="150">
  </a>
</p>

<h3 align="center">Snek Jaen</h3>

<p align="center">
  This is the official jaen project provided by snek-at.
  Free, sexy and cutting edge CMS framework for ReactJS.
  <br>
  <br>
  <cite>"A bowl is most useful when it is empty."</cite> - Lao Tzu
  <br>
  <br>
  <a href="https://github.com/snek-at/jaen/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/snek-at/jaen/issues/new?template=feature_request.md">Request feature</a>
  ·
  <a href="https://github.com/snek-at/jaen/wiki">Documentation</a>
  <br>
  <br>
  <a href="https://www.codacy.com/gh/snek-at/jaen/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=snek-at/jaen&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/bb3d984d38704860ba7ad800d319b8c4" />
  </a>
</p>

Read this readme in a different language: [Deutsch](https://github.com/snek-at/jaen/blob/docs/update-readme/README.de-at.md)

## [](#table-of-contents)What’s In This Document
- [💪 Motivation](#-motivation)
    - [Jaen Features](#jaen-features)
    - [Roadmap](#roadmap)
    - [Msg inspiring PPL](#msg-inspiring-ppl)
    - [Disclaimer](#disclaimer)
- [🚀 Get Up and Running in 5 Minutes](#-get-up-and-running-in-5-minutes)
    - [Generate from template Generate Jaen on GitHub](#generate-from-template-generate-jaen-on-github)
    - [First Deployment](#first-deployment)
    - [Deployment Options](#deployment-options)
        - [Codespace Setup](#codespace-setup)
        - [Local Setup](#local-setup)
            - [Troubleshooting](#troubleshooting)
    - [Editing](#editing)
- [💻 How to Code](#-how-to-code)
    - [Overview](#overview)
        - [Page Settings](#page-settings)
        - [Fields](#fields)
    - [Page Settings](#page-settings)
    - [Fields](#fields)
        - [TextField](#textfield)
        - [ImageField](#imagefield)
        - [BlockContainer](#blockcontainer)
        - [IndexField](#indexfield)
        - [ChoiceField](#choicefield)
    - [Blocks](#blocks)
- [🐞 How to Report a Bug or Request a Feature](#-how-to-report-a-bug-or-request-a-feature)
- [🤝 How to Contribute](#-how-to-contribute)
- [💚 Thanks](#-thanks)
- [💼 Creators](#-creators)
- [🤔 FAQs](#-faqs)
- [🤯 Trivia](#-trivia)
- [📝 Copyright and License](#-copyright-and-license)

## [](#-motivation)💪 Motivation

A CMS **should not** be the defining feature of a webapp. Neither should E-Commerce or anything other than your code. \
ERP integration **should not** force developers to cut corners.

- Jaen **does not** interfere with **your** user experience.
- Jean **does not** challenge **your** application design.
- Jaen gives the power back to **you**.

One thing and one thing only with clean and well documented interfaces.
Customizable, extensible and open-source.

### Jaen Features
* A fast, attractive interface for authors
* Complete control over front-end design and structure
* Fast out of the box, cache-friendly when you need it
* StreamField encourages flexible content without compromising structure
* Excellent support for images and embedded content
* Powered by blockchain and can be run for free
* Simple, intuitive "What you see is what you get" editing mode

### Roadmap
| Feature                       | Shipped | Almost There | We're Writing the Code | Investigating |
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

#### Msg inspiring PPL
Chasing ones own tail is not inspiring.

#### Disclaimer
Not for crybabies. Do not touch if you are afraid of being scratched a little.

## [](#-get-up-and-running-in-5-minutes)🚀 Get Up and Running in 5 Minutes

### Generate from template [Generate Jaen on GitHub](https://github.com/snek-at/jaen-template/generate)
| Generate from template | Important public and no branches |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124399008-16b7d780-dd19-11eb-84bb-769462d5440e.png) | ![image](https://user-images.githubusercontent.com/83394650/124401575-6c48b000-dd2a-11eb-8316-7f583e5e98d7.png) |

### First Deployment
The `GITHUB_TOKEN` has limitations for the first deployment so we have to select the GitHub Pages branch on the repository settings tab. After that, follow the instrucions shown in the pictures below to deploy successfully.

| First deployment failed | Go to the [settings tab](https://github.com/snek-at/jaen-template/settings/pages) |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124398796-ecb1e580-dd17-11eb-9f06-64d73eb2d4d9.png) | ![image](https://user-images.githubusercontent.com/83394650/124398815-0ce1a480-dd18-11eb-9aef-9d8a3797008b.png) |

| Select branch | Deploying again and succeed |
|---|---|
| ![image](https://user-images.githubusercontent.com/83394650/124398825-1408b280-dd18-11eb-985f-f28de94b8888.png) | ![image](https://user-images.githubusercontent.com/83394650/124398968-d3f5ff80-dd18-11eb-8f17-ee2d92900014.png) |

### Deployment Options
We recomend to use [Visual Studio Code](https://github.com/microsoft/vscode) as IDE either in a codespace or using local setup.

#### Codespace Setup
The easiest method is to use a GitHub [Codespace](https://github.com/features/codespaces) (in beta). Just create a GitHub Codespace from the Code menu. Wait for the Codespace to complete provisioning. When the Codespace has completed provisioning, open a terminal window (Ctrl-`, Control-backquote) and:

- Create .env file and set PUBLIC_URL
- Start a local copy of the docs site with `yarn start`
- Or build a local copy of the library with `yarn run build`

#### Local Setup
If you decide to set up locally, make sure you have the following prerequisites:

- Use `yarn install` to install all dependencies
- Start a local copy of the docs site with `yarn start`
- Or build a local copy of the library with `yarn run build`

The demo site will now be accessible at <http://localhost:8000/>.

#### Troubleshooting

- You have to use yarn instead of npm. If you decide to use npm you might run into errors.

If you encounter any other issues getting this template to work, we ask you to [report it](https://github.com/snek-at/jaen/issues) so that we can improve the documentation.

#### Editing

To edit the page you have to log into the CMS.<br />
The standard user for this is **snekman** and the password for the account is **ciscocisco**.

## [](#-how-to-code)💻 How to Code

### Overview

#### Page Settings
| Property                         | Type       | Description | Wiki | Tutorial |
|-------------------------------|:----------:|-------------|:----:|:--------:|
| `TemplateName`             	| string     | The TemplateName defines the name of your template in the context of the CMS. |  |  |

#### Fields
| Field                         | Properties | Description | Wiki | Tutorial |
|-------------------------------|------------|-------------|:----:|:--------:|
| `TextField`             | fieldName <br/> initValue <br/> rtf | TextField can be used to add editable texts to your page.| [✅️](https://github.com/snek-at/jaen/wiki/TextField) |  |
| `ImageField`                  | fieldName <br/> initValue | The ImageField is used to provide editable images that are hosted on the ipfs. | [✅️](https://github.com/snek-at/jaen/wiki/ImageField) |  |
| `BlockContainer`                 | name <br/> reverseOrder <br/> blocks <br/> wrap <br/> wrapProps | With a BlockContainer you can build your own React-Components with editable content and repeat them as often as you like. | [✅️](https://github.com/snek-at/jaen/wiki/BlockContainer) |  |
| `IndexField`                  | fieldName <br/> fixedSlug <br/> onRender | The IndexField provides you with the oppertunity to easily build links, buttons and more pointing to your subpages. It is also useful for building cards that rely on content from childpages.  <br /> With the fixedSlug property you can decide which page the childpages are pulled from. | [✅️](https://github.com/snek-at/jaen/wiki/IndexField) |  |
| `ChoiceField` | fieldName <br/> options <br/> initValue <br/> onRender <br/> onRenderPopover | The ChoiceField allows you to build React-Components and let the adimistrator of the page decide which of the components to display. You can achieve this by either providing a popover in which the options can be decided or you can return null in the popover and add an onClick to your component for usecases in which all the choices are always displayed or for a boolean like behaviour. |  [✅️](https://github.com/snek-at/jaen/wiki/ChoiceField) |  |

### Page Settings
```javascript
import {JaenTemplate} from '@snek-at/jaen-pages'

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
Fields are data blocks that can be used to build React apps which the enduser is able to maintain. 
Fieldnames have to be unique when they are on the same page.
It is advisable to give all the fields descriptive names.

#### TextField

The TextField is there to provide your react-components with editable content.
It requires you to give it a fieldName and an initValue.
The fieldName sets the name of the TextField for the CMS and the initValue sets the value the field has before it gets edited.
By default the TextField provides you with an editable RichText. If you only need a short one liner for a heading etc. you can set rtf to false to restrict the field.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/TextField)</div>

```javascript
import {fields, JaenTemplate} from '@snek-at/jaen-pages'

const HomePage: JaenTemplate = () => {
  return(
    <fields.TextField 
      fieldName="home-text"
      initValue="<p>Your text</p>"
      rtf={true}
    />
  )
}

HomePage.TemplateName = 'HomePage'

export default HomePage
```

#### ImageField

The ImageField is the Jaen field that allows you to embed images hosted on the IPFS. It requires both a fieldName and an initValue.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/ImageField)</div>

```javascript
import {fields, JaenTemplate} from '@snek-at/jaen-pages'

const HomePage: JaenTemplate = () => {
  return(
    <fields.ImageField 
      fieldName="home-image"
      initValue={{src: 'https://your.source', alt: 'homeimage', title: 'homeimage'}}
      style={{width: '300px', height: '180px'}}
      className="imagefield"
    />
  )
}

HomePage.TemplateName = 'HomePage'

export default HomePage
```

#### BlockContainer

Jaen BlockContainers enable you to integrate editable blocks and to use as many of them as you like. You can put them into a [Chakra UI wrap](https://chakra-ui.com/docs/layout/wrap) and pass props to the wrap. In order to use this field you are required to build a block. You can find an example of a block below.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/StreamField)</div>

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

##### Chakra UI Wrap Example

This example displays five boxes of varying colors with a 1 rem space between them in a flex that goes into the next row if the content is too wide. It also centers the boxes. 

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

If you want to link to childpages of a slug, the IndexField is your friend. The fixedSlug property is not required. When none is provided, the children of the  page the IndexField is on are used. If you like, it is possible to specify the parentpage and the onRender property allows you to build cards, teasers, buttons and more to your subpages.<div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/IndexField)</div>

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

The ChoiceField allows you to build React-Components and let the administrator of the page decide which of the components to display. You can achieve this by either providing a popover in which the options can be decided or you can return null in the popover and add an onClick to your component for use-cases in which all the choices are always displayed or for a boolean like behaviour.

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



### Blocks
The Block is the keystone of the BlockContainer. With the help of blocks you can build complex React-Components with editable content. All available fields can be used inside a block. <div align=right>[Wiki 📖](https://github.com/snek-at/jaen/wiki/Blocks)</div>

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


## [](#-how-to-report-a-bug-or-request-a-feature)🐞 How to Report a Bug or Request a Feature

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not
addressed yet, [please open a new issue](https://github.com/snek-at/jaen/issues/new/choose).

## [](#-how-to-contribute)🤝 How to Contribute
![GitHub last commit](https://img.shields.io/github/last-commit/snek-at/jaen)
![GitHub issues](https://img.shields.io/github/issues-raw/snek-at/jaen)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/snek-at/jaen?color=green)

Please read through our
[contributing guidelines](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.md). Included are
directions for opening issues, coding standards, and notes on development.

All code should conform to the [Code Guide](https://github.com/snek-at/tonic/blob/master/STYLE_GUIDE.md), maintained by
[snek-at](https://github.com/snek-at).

## [](#-thanks)💚 Thanks

We do not have any external contributors yet, but if you want your name to be here, feel free
to [contribute to our project](#contributing).

## [](#-creators)💼 Creators

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
      <a href="https://github.com/petute">Daniel<br/>Petutschnigg</a>
    </td>
  </tr>
</table>

## [](#-faqs)🤔 FAQs
**Q:** What do the roadmap categories mean?
* Shipped - Hopefully you are enjoying it! Give us feedback on how it is working!
* Almost There - We are applying the finishing touches. Things in this bucket you can expect to be shipped within 2-4 weeks. 
* We're Writing the Code - Actively in development, we are trying to get this out to you in a good state as soon as we can.
* Investigating - We're thinking about it. This might mean we're still designing, or thinking through how this might work. This is a great phase to send how you want to see something implemented! We'd love to see your usecase or design ideas here.

**Q:** Why are there no dates on your roadmap?

**A:** Because we know things change and we want the room to do the right thing by fixing security issues as they come up or helping people out where they need. This means we might have to change our priorities and don’t want to let people down. 

**Q:** How can I provide feedback or ask for more information?

**A:** Please open an issue in this repo! If the issue is a bug or security issue, please follow the separate instructions above.

**Q:** How can I request a feature be added to the roadmap?

**A:** Please open an issue! You can read about how to contribute [here](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.MD). Community submitted issues will be tagged "Proposed" and will be reviewed by the team.

## [](#-trivia)🤯 Trivia
#### Name:
In Austria the first month of the year is called "Jänner" since we started working on this project in January we decided to name the project Jaen.
#### Pronounciation:
The name Jaen is pronounced (Jän)ner [ˈjɛn] or (Jan)uary [ˈdʒæn].
#### Password:
The standard password in Jaen is **ciscocisco**. The origin of this password were back at our time in school. Most of us went to school for network engineering and in the cisco courses the standard password would always be ciscocisco.
#### Releases:
Every one of our Jaen releases has it's own theme song. Have fun with it.
#### Mascot:
The inofficial mascot of this project is a girl holding an electric guitar.

### <3


## [](#-copyright-and-license)📝 Copyright and License

![GitHub repository license](https://img.shields.io/badge/license-EUPL--1.2-blue)

Use of this source code is governed by an EUPL-1.2 license that can be found
in the LICENSE file at https://snek.at/license

<!--
  SPDX-FileCopyrightText: Copyright © 2021 snek.at
  SPDX-License-Identifier: EUPL-1.2
  Use of this source code is governed by an EUPL-1.2 license that can be found
  in the LICENSE file at https://snek.at/license
-->

