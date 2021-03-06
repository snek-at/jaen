# [@snek-at/jaen-pages-v2.1.0](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.1...@snek-at/jaen-pages-v2.1.0) (2021-11-22)


### Bug Fixes

* **jaen-pages cli:** update empty baseEntity check ([8c7d908](https://github.com/snek-at/jaen/commit/8c7d9088b1dfc061e3259b7b3a1147fc4ac80415))


### Features

* **jaen-pages:** switch from ipfs to osg ([3e9df13](https://github.com/snek-at/jaen/commit/3e9df13598944ad546aa36b2a52594c4d900478f))

# [@snek-at/jaen-pages-v2.0.1](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0...@snek-at/jaen-pages-v2.0.1) (2021-10-02)


### Bug Fixes

* **fields:** add optional pageId to fields ([c536ba6](https://github.com/snek-at/jaen/commit/c536ba64184d9ab564b350d3dfdd1e13378ee2ac))
* resolve typo ([8beb602](https://github.com/snek-at/jaen/commit/8beb602049bb4c6422e5f43ac3233e2539530ed1))

# [@snek-at/jaen-pages-v2.0.0](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v1.0.0...@snek-at/jaen-pages-v2.0.0) (2021-09-27)


### Bug Fixes

* **blockcontainer:** add pageFieldBlocksSelector equality check ([63e1fdc](https://github.com/snek-at/jaen/commit/63e1fdc0d5bd7fa75e0ed62271a9aefe0fcf34c6))
* **blockcontainer:** add workaround to bypass field registration inside a block container ([2e55edf](https://github.com/snek-at/jaen/commit/2e55edfe0a168b2cc91fa9bf8ac3be13fcda35d1))
* **blockcontainer:** remove ref ([de6aca1](https://github.com/snek-at/jaen/commit/de6aca182a83f0f2ce6ade7b938ecb8e3aaa18bd))
* **ckeditor:** update memo equal check and editor import ([0ac3c34](https://github.com/snek-at/jaen/commit/0ac3c340073fcfa85c598474f999e0648c1eb346))
* **create-images:** set blockFieldName instead of fieldName for block ([174b676](https://github.com/snek-at/jaen/commit/174b676a4cde40f2ef673b51756c686e2be181ac))
* **fields:** remove WA, add block registration and fix missing block data ([fb4c2df](https://github.com/snek-at/jaen/commit/fb4c2df08b8129b48245238736bd6d767d69f47b))
* **gatsby-node:** add missing slug on fixed pages that are not the index ([81eb4c5](https://github.com/snek-at/jaen/commit/81eb4c5bce7dc0f27ca2fed500d7336ed65de6df))
* **gatsby-node:** fix variable not defined error ([0013d08](https://github.com/snek-at/jaen/commit/0013d08882d6c3188508c70caee85d1272e60bbe))
* **imagefield:** blinking on hover when using position absolut fixed ([d45c6f9](https://github.com/snek-at/jaen/commit/d45c6f92906bcb2acb271056fb94a6a9a832cda2))
* **jaenpagecontext:** parse fields string to object ([23036ac](https://github.com/snek-at/jaen/commit/23036acc6ac993125ec598c8b01994b3abe890a8))
* **package.json:** align versions ([cfd6201](https://github.com/snek-at/jaen/commit/cfd6201a2212063a65b7d17d9d1d0097a0cd7b62))
* **package.json:** align versions ([e28c4c9](https://github.com/snek-at/jaen/commit/e28c4c93e5294e44d446d80b311826d577813163))
* **package.json:** align versions ([5f0e61a](https://github.com/snek-at/jaen/commit/5f0e61a2425e43b7a38d58bf2e29be2802f639e1))
* **package.json:** align versions ([0bedf29](https://github.com/snek-at/jaen/commit/0bedf29c917a4d755ac48c3220725ac6f22fe7ac))
* **package.json:** align versions ([a7b59a3](https://github.com/snek-at/jaen/commit/a7b59a3ac9f7d81bb6efcb5a2a866e138f7969cc))
* **package.json:** align versions ([07a4c3a](https://github.com/snek-at/jaen/commit/07a4c3a1937d9aae57214457d04bc9e2fdf316d3))
* **package.json:** update incorrect version ([d32fa1a](https://github.com/snek-at/jaen/commit/d32fa1a5c8961aefc19f98489932e0fc03867ed7))
* **pages:** updated page creating and publishing ([ac2e630](https://github.com/snek-at/jaen/commit/ac2e630dbbc6f0c916ae3d87dcf921c851eb6435))
* **publish:** include cms data in path generation ([6ca1cf8](https://github.com/snek-at/jaen/commit/6ca1cf8dc731c36f0922808a261ee97f798936de))
* **publish:** publishing works also without page changes now ([a091153](https://github.com/snek-at/jaen/commit/a0911534a067e417849ba70e4c3d0407bfc447fc))
* **seo:** fix page image url ([5e55706](https://github.com/snek-at/jaen/commit/5e55706837336e541c8243360e18ce8890de7dbc))
* **settingstab:** fix state updates ([0535ee5](https://github.com/snek-at/jaen/commit/0535ee54619392c51912631973b799b1115d73ae))
* **snekfinder:** fix imageviewer bug on scrolling ([7ae24ff](https://github.com/snek-at/jaen/commit/7ae24ff0a8441dbaac0528fc3082ce1e3db26147))
* **types:** add ts ignore to module without type declarations ([e979a0f](https://github.com/snek-at/jaen/commit/e979a0fba1a5f12726322be63eb811910593270f))
* add portal and zindex to mainui ([12f6aed](https://github.com/snek-at/jaen/commit/12f6aed5d5cbdad208d92a1d6d7d3347e6e0a7a9))
* adjust dynamic path generation ([8cc1f5b](https://github.com/snek-at/jaen/commit/8cc1f5b472b534708bf59d07a6f5d3e8efe893a2))
* adjust slug and title for static page generation ([d901568](https://github.com/snek-at/jaen/commit/d90156893605e84077bb50f7609bbbf1e7c6a344))
* adjust title and slug for static page generation ([469fb4e](https://github.com/snek-at/jaen/commit/469fb4e9e7699268dd36243dabdc64871c48d921))
* **blockcontainer:** disable SFBWrapper when not editing ([a171b96](https://github.com/snek-at/jaen/commit/a171b9610718864037f2a2fe5b4de44369886e2f))
* **jaen-pages cli:** fix cli typescript error ([780c4af](https://github.com/snek-at/jaen/commit/780c4af97387254f24d01580486badbc3fa8efd2))
* **package.json:** align versions ([3ae446a](https://github.com/snek-at/jaen/commit/3ae446ae64e4d7f7472f1f919aed521734109a3d))
* blocks are not included into build ([e6b239a](https://github.com/snek-at/jaen/commit/e6b239ac40059f86fa676c78cde5f694d3b8801a))
* make createFile function async ([ba94b8b](https://github.com/snek-at/jaen/commit/ba94b8b8d8a7ea86fb7272fdc066846e52ac09cf))
* **.babelrc:** add preset-react ([36a0f2c](https://github.com/snek-at/jaen/commit/36a0f2cba18b74a4a2a20e94bdc9d61f29c7089b))
* **build:** build gatsby plugins with babel ([951ae23](https://github.com/snek-at/jaen/commit/951ae2391abbfa3ad9b1c4418558c48c095d60a3))
* **chakra:** reset css ([2d1d195](https://github.com/snek-at/jaen/commit/2d1d1956ae3c61f188696ea268625395cb1ffe37))
* **choicefield:** enable popover only on editing ([4ee9231](https://github.com/snek-at/jaen/commit/4ee923178ab30045d44f0d74ec85c8995bc02c52))
* **imagefield:** image discard resets to context image now ([651d0a0](https://github.com/snek-at/jaen/commit/651d0a0f0f7fa7436dbaa28b6b37a7190212f041))
* **imagefield:** switch interface use correct types ([835da4d](https://github.com/snek-at/jaen/commit/835da4d4bf933df79cb20e76d6f2f60c5c834068))
* **indexfield:** fix page context ([74d6383](https://github.com/snek-at/jaen/commit/74d6383c5e52600dc64640e2e0e44c492110b758))
* **license:** fix incorrect license spdx id ([21db14d](https://github.com/snek-at/jaen/commit/21db14dc08ef75fe72fd18718ab0fafab5eb26dd))
* **package.json:** add dist to files ([243b531](https://github.com/snek-at/jaen/commit/243b53141fc7069c1f3244a40f3fd683c987dcde))
* **package.json:** align monorepo package versions ([69661f7](https://github.com/snek-at/jaen/commit/69661f761edc4aa6c0839cb0a588dd328ec098a5))
* **package.json:** align versions ([35e74c1](https://github.com/snek-at/jaen/commit/35e74c170d136f28676228e8726794aec45cb642))
* **package.json:** align versions ([ca6fc14](https://github.com/snek-at/jaen/commit/ca6fc14c3ac34e6853d3c3d6afa894fe10dae445))
* **package.json:** fix jaen-shared-ui version ([c340a35](https://github.com/snek-at/jaen/commit/c340a3517111c0c28d415f787a4bd32f2b085c1e))
* **package.json:** fix versions ([16c706c](https://github.com/snek-at/jaen/commit/16c706c328db52088ee1d521ab5c69c715221267))
* **package.json:** remove files ([fdc78ca](https://github.com/snek-at/jaen/commit/fdc78caa8fb876c32b33c5c106bec046e4204dfe))
* **textfield:** set to full width in order to fix dissapearing issue ([e5f8a86](https://github.com/snek-at/jaen/commit/e5f8a86f51a10d4afc0debbd4743dd6a623d3634))
* change type to fix type error ([c272338](https://github.com/snek-at/jaen/commit/c27233809a2488b7836aa04b1a8109ca06eaab80))
* **package.json:** update snekfinder version ([a764f35](https://github.com/snek-at/jaen/commit/a764f354abc83e43bf355c4efee57dc4c7e2b1d4))
* disable page updating on page change ([cbd2656](https://github.com/snek-at/jaen/commit/cbd2656579947d62e03efaf00212ee6533d2cb95))
* enable image creation for none jaen pages ([5a4d4d4](https://github.com/snek-at/jaen/commit/5a4d4d4c6162bfd181d2eec895fea6e3ef986578))
* enable page movement for non dynamic pages ([26c83d3](https://github.com/snek-at/jaen/commit/26c83d39b8a0eba550735c6bea8398d2abb186b9))
* **streamfield:** remove SFBWrapper on editing ([548653b](https://github.com/snek-at/jaen/commit/548653b033d95146a73f779ab274840fb04a57af))
* enable transpiling ([037856a](https://github.com/snek-at/jaen/commit/037856a4bad791be351cc03b2afb29c65f9b8bff))
* fix incorrect import ([2f286a9](https://github.com/snek-at/jaen/commit/2f286a9cdb6d224d1e2387307840d10eb92d450a))
* fix type error ([5ffba24](https://github.com/snek-at/jaen/commit/5ffba2401a38c4a0dd52e318f3bd0767121499a8))
* fix versions ([fb37799](https://github.com/snek-at/jaen/commit/fb37799fb95fa47dbf2adee3a3ab462c636e9fe9))
* improve file creating and jaen plugin register ([6a32003](https://github.com/snek-at/jaen/commit/6a3200390217a21eb57d962022681d05e5acff84))
* incorrect default selection ([950e5b6](https://github.com/snek-at/jaen/commit/950e5b64b831b0ed0157fd4bb0c110f97e4bcda4))
* page deleting ([f151188](https://github.com/snek-at/jaen/commit/f1511888a65e875f56f3f1bccb775a00ecac714a))
* page relations now work via jaenPageContext ([202d691](https://github.com/snek-at/jaen/commit/202d6919779e5bdde3178bc7afa1dcc14fa67f44))
* remove withRedux from TemplateProvider ([11bfc1e](https://github.com/snek-at/jaen/commit/11bfc1e71bae13e5b4b58d05ef5791b2b0c7d9fb))
* update import path (remove path alias) ([05cb5d7](https://github.com/snek-at/jaen/commit/05cb5d701b882490a23e6e5bcd2122cb4a365403))
* **package.json:** update versions ([8ce78ef](https://github.com/snek-at/jaen/commit/8ce78ef6a1b494f06428845f9470fe0717a030f3))
* **snekfinder:** update version to fix some bugs ([63ba0c1](https://github.com/snek-at/jaen/commit/63ba0c1abb762a8da6d283db6c0ef71b3115e491))
* page creaction and esm ([ab3bbda](https://github.com/snek-at/jaen/commit/ab3bbdabc37ae4ef14044bd6b29c4dfb80254362))
* remove babel transpiling ([e443f18](https://github.com/snek-at/jaen/commit/e443f1889081f428ca7a724c732d29701182ae65))
* remove build alerts ([b1153fe](https://github.com/snek-at/jaen/commit/b1153fe633d650fb937c9f41684cb301b1c06671))
* remove optional chaining in esm module ([43ad1d2](https://github.com/snek-at/jaen/commit/43ad1d226812b84fa1280eb23b360fe21ef1fe59))
* remove transpiling ([9ec9b59](https://github.com/snek-at/jaen/commit/9ec9b59b69515bbdf3c47b77c9434ce2b38632f3))
* resolve paths for publish pages ([4fea93f](https://github.com/snek-at/jaen/commit/4fea93fdb5b8a47e3b6d03488178b87d61e89016))
* **package.json:** update version ([fe2aa5a](https://github.com/snek-at/jaen/commit/fe2aa5a3c8a24533cf12497f1c96166cfd91b159))
* **package.json:** update version ([bfd63ae](https://github.com/snek-at/jaen/commit/bfd63ae79015028cb65bc88c384c0a7afc111903))


### Features

* **blockcontainer:** enable wrap for container ([504dd50](https://github.com/snek-at/jaen/commit/504dd508ac13f83ccafca3764eb6144a294b1299))
* **chakraui:** enfore chakraui through jaen ([bd539de](https://github.com/snek-at/jaen/commit/bd539de1513f7656f5a7a5ce2f30c8c1628f8967))
* **choicefield:** add disable option for popover ([91a36ac](https://github.com/snek-at/jaen/commit/91a36ac01c4899d5a284b53c55e8e1416a125cbb))
* **imagefield:** add build data for blocks ([7777174](https://github.com/snek-at/jaen/commit/7777174f391ed2f222b0ae850fb61b63a560323c))
* **mainui:** provide hideUI status through core provider ([2288635](https://github.com/snek-at/jaen/commit/228863568f75c68e127e143b47c0bc90ed5c2bf1))
* **release:** update to v2.0.0 ([3093c33](https://github.com/snek-at/jaen/commit/3093c33b57996686fd8049d1201826a540024bc7))
* **seo:** add react helmet gatsby plugin to ssr meta tags ([5490aa7](https://github.com/snek-at/jaen/commit/5490aa72fc071c256b11ee4f6c26bb19a339203c))
* **snekfinder:** sync files on publish ([b67a68c](https://github.com/snek-at/jaen/commit/b67a68c3a18debee9ba91f97ed4ebe512ee6b75d))
* add ChoiceField ([115417b](https://github.com/snek-at/jaen/commit/115417b7a0fc9aca684df8ee068a87d58ce365bb))
* add fields data support ([2fd31f9](https://github.com/snek-at/jaen/commit/2fd31f9b9463f2b6986c46dd53e7d7256703fc99))
* **seo:** add SEO to TemplateProvider ([38fc053](https://github.com/snek-at/jaen/commit/38fc0531adfbb7f58d96f6cbc3d86b7b94dbe18d))
* add gatsby publishing ([83d2704](https://github.com/snek-at/jaen/commit/83d270482c60a7783b408c7f954e8e148e51e741))
* add jaen-pages cli ([b2a9724](https://github.com/snek-at/jaen/commit/b2a972405f307e1682f5f72a23c1f026bbe9f2bb))
* add jaen-pages migration workflow ([008918c](https://github.com/snek-at/jaen/commit/008918cc1c8d8ee88ad914f674b978ebc68e21c6))
* add jaenPageContext ([2bf4da1](https://github.com/snek-at/jaen/commit/2bf4da1a154de2db83ebbec6fad5cfa3a758053b))
* add options hook ([c4d7c20](https://github.com/snek-at/jaen/commit/c4d7c20e0b2bb00b31298a3f8b7eedcb03289ba7))
* add template name to page content ([69e75b8](https://github.com/snek-at/jaen/commit/69e75b8ac694aa35f6630bbd6fc5617e5671afa9))
* compile plugins as es6 ([5473ed0](https://github.com/snek-at/jaen/commit/5473ed07dec4fbfdffa5df06f6a65dbba65177c7))
* enable childpages for static pages ([c8f442e](https://github.com/snek-at/jaen/commit/c8f442e58f0d83367abd821c29ec822837a10e45))
* introduce BlockContainer (StreamField replacement) ([e89c100](https://github.com/snek-at/jaen/commit/e89c1002b05ed33f69240b128d129ddbea5cb362))
* jaenImage uses GatsbyImage now ([a28b99e](https://github.com/snek-at/jaen/commit/a28b99ec0e6bd83cb6359c4ff4783f6847e6a3a4))
* remove initialValue form StreamField ([1c60e15](https://github.com/snek-at/jaen/commit/1c60e15311338ff2f060269ed81812a4ef2b655a))
* send publish request on button press ([75d5cfc](https://github.com/snek-at/jaen/commit/75d5cfcb35bcde7e7f3d455b44b9921e1dd2eefa))
* streamField not includes build data ([b12ff24](https://github.com/snek-at/jaen/commit/b12ff24803c3c7e82971fbe252bb0c333fec469e))
* **auth:** add guest mode ([3431548](https://github.com/snek-at/jaen/commit/343154897e8b9794594b964b5f559c69e6cfdbc7))
* **pageexplorer:** add dynamic routing ([7a36761](https://github.com/snek-at/jaen/commit/7a3676174ad0130091830c67cf6d6b88029b59e3))


### Performance Improvements

* **blockcontainer:** memo blocks inside of container to reduce renderings ([db60407](https://github.com/snek-at/jaen/commit/db604079db6e15ea17d361a9e96c5e121b920d9c))
* **ckeditor:** load bundle only if editing is true (prevents from loading it to SSR) ([acabb30](https://github.com/snek-at/jaen/commit/acabb308285769a7d2beb666b2097a82822f273e))
* **ckeditor:** only render if `defaultData.shouldOverrideRand` changes ([61361dc](https://github.com/snek-at/jaen/commit/61361dc785f21ec38b1df25d321cf4c3fcd8e1a5))
* use dynamic imports to reduce the bundle size ([712dfe3](https://github.com/snek-at/jaen/commit/712dfe3f8fb970ffc1ce7fbd9e3cf34f5b183985))


### BREAKING CHANGES

* **release:** Update to v2.0.0

# [@snek-at/jaen-pages-v2.0.0-beta.48](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.47...@snek-at/jaen-pages-v2.0.0-beta.48) (2021-09-27)


### Bug Fixes

* **snekfinder:** fix imageviewer bug on scrolling ([7ae24ff](https://github.com/snek-at/jaen/commit/7ae24ff0a8441dbaac0528fc3082ce1e3db26147))


### Features

* **snekfinder:** sync files on publish ([b67a68c](https://github.com/snek-at/jaen/commit/b67a68c3a18debee9ba91f97ed4ebe512ee6b75d))

# [@snek-at/jaen-pages-v2.0.0-beta.47](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.46...@snek-at/jaen-pages-v2.0.0-beta.47) (2021-09-26)


### Features

* **mainui:** provide hideUI status through core provider ([2288635](https://github.com/snek-at/jaen/commit/228863568f75c68e127e143b47c0bc90ed5c2bf1))

# [@snek-at/jaen-pages-v2.0.0-beta.46](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.45...@snek-at/jaen-pages-v2.0.0-beta.46) (2021-09-26)


### Bug Fixes

* **package.json:** align versions ([cfd6201](https://github.com/snek-at/jaen/commit/cfd6201a2212063a65b7d17d9d1d0097a0cd7b62))

# [@snek-at/jaen-pages-v2.0.0-beta.45](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.44...@snek-at/jaen-pages-v2.0.0-beta.45) (2021-09-16)


### Bug Fixes

* **seo:** fix page image url ([5e55706](https://github.com/snek-at/jaen/commit/5e55706837336e541c8243360e18ce8890de7dbc))

# [@snek-at/jaen-pages-v2.0.0-beta.44](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.43...@snek-at/jaen-pages-v2.0.0-beta.44) (2021-09-16)


### Features

* **seo:** add react helmet gatsby plugin to ssr meta tags ([5490aa7](https://github.com/snek-at/jaen/commit/5490aa72fc071c256b11ee4f6c26bb19a339203c))

# [@snek-at/jaen-pages-v2.0.0-beta.43](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.42...@snek-at/jaen-pages-v2.0.0-beta.43) (2021-09-16)


### Bug Fixes

* **gatsby-node:** add missing slug on fixed pages that are not the index ([81eb4c5](https://github.com/snek-at/jaen/commit/81eb4c5bce7dc0f27ca2fed500d7336ed65de6df))
* **settingstab:** fix state updates ([0535ee5](https://github.com/snek-at/jaen/commit/0535ee54619392c51912631973b799b1115d73ae))

# [@snek-at/jaen-pages-v2.0.0-beta.42](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.41...@snek-at/jaen-pages-v2.0.0-beta.42) (2021-09-15)


### Bug Fixes

* **ckeditor:** update memo equal check and editor import ([0ac3c34](https://github.com/snek-at/jaen/commit/0ac3c340073fcfa85c598474f999e0648c1eb346))

# [@snek-at/jaen-pages-v2.0.0-beta.41](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.40...@snek-at/jaen-pages-v2.0.0-beta.41) (2021-09-15)


### Bug Fixes

* **imagefield:** blinking on hover when using position absolut fixed ([d45c6f9](https://github.com/snek-at/jaen/commit/d45c6f92906bcb2acb271056fb94a6a9a832cda2))
* **jaenpagecontext:** parse fields string to object ([23036ac](https://github.com/snek-at/jaen/commit/23036acc6ac993125ec598c8b01994b3abe890a8))

# [@snek-at/jaen-pages-v2.0.0-beta.40](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.39...@snek-at/jaen-pages-v2.0.0-beta.40) (2021-09-15)


### Bug Fixes

* **types:** add ts ignore to module without type declarations ([e979a0f](https://github.com/snek-at/jaen/commit/e979a0fba1a5f12726322be63eb811910593270f))


### Performance Improvements

* **ckeditor:** load bundle only if editing is true (prevents from loading it to SSR) ([acabb30](https://github.com/snek-at/jaen/commit/acabb308285769a7d2beb666b2097a82822f273e))
* **ckeditor:** only render if `defaultData.shouldOverrideRand` changes ([61361dc](https://github.com/snek-at/jaen/commit/61361dc785f21ec38b1df25d321cf4c3fcd8e1a5))

# [@snek-at/jaen-pages-v2.0.0-beta.39](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.38...@snek-at/jaen-pages-v2.0.0-beta.39) (2021-09-15)


### Bug Fixes

* update import path (remove path alias) ([05cb5d7](https://github.com/snek-at/jaen/commit/05cb5d701b882490a23e6e5bcd2122cb4a365403))

# [@snek-at/jaen-pages-v2.0.0-beta.38](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.37...@snek-at/jaen-pages-v2.0.0-beta.38) (2021-09-15)


### Bug Fixes

* **gatsby-node:** fix variable not defined error ([0013d08](https://github.com/snek-at/jaen/commit/0013d08882d6c3188508c70caee85d1272e60bbe))

# [@snek-at/jaen-pages-v2.0.0-beta.37](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.36...@snek-at/jaen-pages-v2.0.0-beta.37) (2021-09-14)


### Features

* add fields data support ([2fd31f9](https://github.com/snek-at/jaen/commit/2fd31f9b9463f2b6986c46dd53e7d7256703fc99))

# [@snek-at/jaen-pages-v2.0.0-beta.36](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.35...@snek-at/jaen-pages-v2.0.0-beta.36) (2021-09-14)


### Bug Fixes

* **publish:** publishing works also without page changes now ([a091153](https://github.com/snek-at/jaen/commit/a0911534a067e417849ba70e4c3d0407bfc447fc))


### Performance Improvements

* use dynamic imports to reduce the bundle size ([712dfe3](https://github.com/snek-at/jaen/commit/712dfe3f8fb970ffc1ce7fbd9e3cf34f5b183985))

# [@snek-at/jaen-pages-v2.0.0-beta.35](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.34...@snek-at/jaen-pages-v2.0.0-beta.35) (2021-09-14)


### Bug Fixes

* **blockcontainer:** add pageFieldBlocksSelector equality check ([63e1fdc](https://github.com/snek-at/jaen/commit/63e1fdc0d5bd7fa75e0ed62271a9aefe0fcf34c6))
* **create-images:** set blockFieldName instead of fieldName for block ([174b676](https://github.com/snek-at/jaen/commit/174b676a4cde40f2ef673b51756c686e2be181ac))
* **fields:** remove WA, add block registration and fix missing block data ([fb4c2df](https://github.com/snek-at/jaen/commit/fb4c2df08b8129b48245238736bd6d767d69f47b))
* **package.json:** align versions ([e28c4c9](https://github.com/snek-at/jaen/commit/e28c4c93e5294e44d446d80b311826d577813163))

# [@snek-at/jaen-pages-v2.0.0-beta.34](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.33...@snek-at/jaen-pages-v2.0.0-beta.34) (2021-09-14)


### Bug Fixes

* **pages:** updated page creating and publishing ([ac2e630](https://github.com/snek-at/jaen/commit/ac2e630dbbc6f0c916ae3d87dcf921c851eb6435))

# [@snek-at/jaen-pages-v2.0.0-beta.33](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.32...@snek-at/jaen-pages-v2.0.0-beta.33) (2021-09-14)


### Bug Fixes

* adjust title and slug for static page generation ([469fb4e](https://github.com/snek-at/jaen/commit/469fb4e9e7699268dd36243dabdc64871c48d921))

# [@snek-at/jaen-pages-v2.0.0-beta.32](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.31...@snek-at/jaen-pages-v2.0.0-beta.32) (2021-09-14)


### Bug Fixes

* **blockcontainer:** add workaround to bypass field registration inside a block container ([2e55edf](https://github.com/snek-at/jaen/commit/2e55edfe0a168b2cc91fa9bf8ac3be13fcda35d1))
* **package.json:** align versions ([5f0e61a](https://github.com/snek-at/jaen/commit/5f0e61a2425e43b7a38d58bf2e29be2802f639e1))
* **package.json:** update incorrect version ([d32fa1a](https://github.com/snek-at/jaen/commit/d32fa1a5c8961aefc19f98489932e0fc03867ed7))
* **publish:** include cms data in path generation ([6ca1cf8](https://github.com/snek-at/jaen/commit/6ca1cf8dc731c36f0922808a261ee97f798936de))
* **snekfinder:** update version to fix some bugs ([63ba0c1](https://github.com/snek-at/jaen/commit/63ba0c1abb762a8da6d283db6c0ef71b3115e491))
* adjust dynamic path generation ([8cc1f5b](https://github.com/snek-at/jaen/commit/8cc1f5b472b534708bf59d07a6f5d3e8efe893a2))
* adjust slug and title for static page generation ([d901568](https://github.com/snek-at/jaen/commit/d90156893605e84077bb50f7609bbbf1e7c6a344))

# [@snek-at/jaen-pages-v2.0.0-beta.31](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.30...@snek-at/jaen-pages-v2.0.0-beta.31) (2021-09-14)


### Bug Fixes

* **package.json:** align versions ([0bedf29](https://github.com/snek-at/jaen/commit/0bedf29c917a4d755ac48c3220725ac6f22fe7ac))

# [@snek-at/jaen-pages-v2.0.0-beta.30](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.29...@snek-at/jaen-pages-v2.0.0-beta.30) (2021-09-13)


### Features

* **seo:** add SEO to TemplateProvider ([38fc053](https://github.com/snek-at/jaen/commit/38fc0531adfbb7f58d96f6cbc3d86b7b94dbe18d))

# [@snek-at/jaen-pages-v2.0.0-beta.29](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.28...@snek-at/jaen-pages-v2.0.0-beta.29) (2021-09-13)


### Bug Fixes

* **package.json:** align versions ([a7b59a3](https://github.com/snek-at/jaen/commit/a7b59a3ac9f7d81bb6efcb5a2a866e138f7969cc))

# [@snek-at/jaen-pages-v2.0.0-beta.28](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.27...@snek-at/jaen-pages-v2.0.0-beta.28) (2021-09-12)


### Bug Fixes

* **blockcontainer:** remove ref ([de6aca1](https://github.com/snek-at/jaen/commit/de6aca182a83f0f2ce6ade7b938ecb8e3aaa18bd))

# [@snek-at/jaen-pages-v2.0.0-beta.27](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.26...@snek-at/jaen-pages-v2.0.0-beta.27) (2021-09-12)


### Bug Fixes

* enable image creation for none jaen pages ([5a4d4d4](https://github.com/snek-at/jaen/commit/5a4d4d4c6162bfd181d2eec895fea6e3ef986578))
* enable page movement for non dynamic pages ([26c83d3](https://github.com/snek-at/jaen/commit/26c83d39b8a0eba550735c6bea8398d2abb186b9))
* fix versions ([fb37799](https://github.com/snek-at/jaen/commit/fb37799fb95fa47dbf2adee3a3ab462c636e9fe9))
* improve file creating and jaen plugin register ([6a32003](https://github.com/snek-at/jaen/commit/6a3200390217a21eb57d962022681d05e5acff84))
* page relations now work via jaenPageContext ([202d691](https://github.com/snek-at/jaen/commit/202d6919779e5bdde3178bc7afa1dcc14fa67f44))
* remove build alerts ([b1153fe](https://github.com/snek-at/jaen/commit/b1153fe633d650fb937c9f41684cb301b1c06671))
* remove withRedux from TemplateProvider ([11bfc1e](https://github.com/snek-at/jaen/commit/11bfc1e71bae13e5b4b58d05ef5791b2b0c7d9fb))
* resolve paths for publish pages ([4fea93f](https://github.com/snek-at/jaen/commit/4fea93fdb5b8a47e3b6d03488178b87d61e89016))

# [@snek-at/jaen-pages-v2.0.0-beta.26](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.25...@snek-at/jaen-pages-v2.0.0-beta.26) (2021-09-10)


### Bug Fixes

* add portal and zindex to mainui ([12f6aed](https://github.com/snek-at/jaen/commit/12f6aed5d5cbdad208d92a1d6d7d3347e6e0a7a9))


### Features

* **blockcontainer:** enable wrap for container ([504dd50](https://github.com/snek-at/jaen/commit/504dd508ac13f83ccafca3764eb6144a294b1299))
* enable childpages for static pages ([c8f442e](https://github.com/snek-at/jaen/commit/c8f442e58f0d83367abd821c29ec822837a10e45))

# [@snek-at/jaen-pages-v2.0.0-beta.25](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.24...@snek-at/jaen-pages-v2.0.0-beta.25) (2021-09-10)


### Bug Fixes

* **package.json:** align versions ([07a4c3a](https://github.com/snek-at/jaen/commit/07a4c3a1937d9aae57214457d04bc9e2fdf316d3))

# [@snek-at/jaen-pages-v2.0.0-beta.24](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.23...@snek-at/jaen-pages-v2.0.0-beta.24) (2021-09-10)


### Bug Fixes

* **jaen-pages cli:** fix cli typescript error ([780c4af](https://github.com/snek-at/jaen/commit/780c4af97387254f24d01580486badbc3fa8efd2))

# [@snek-at/jaen-pages-v2.0.0-beta.23](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.22...@snek-at/jaen-pages-v2.0.0-beta.23) (2021-09-09)


### Bug Fixes

* **blockcontainer:** disable SFBWrapper when not editing ([a171b96](https://github.com/snek-at/jaen/commit/a171b9610718864037f2a2fe5b4de44369886e2f))

# [@snek-at/jaen-pages-v2.0.0-beta.22](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.21...@snek-at/jaen-pages-v2.0.0-beta.22) (2021-09-09)


### Bug Fixes

* **package.json:** align versions ([3ae446a](https://github.com/snek-at/jaen/commit/3ae446ae64e4d7f7472f1f919aed521734109a3d))
* blocks are not included into build ([e6b239a](https://github.com/snek-at/jaen/commit/e6b239ac40059f86fa676c78cde5f694d3b8801a))


### Features

* **choicefield:** add disable option for popover ([91a36ac](https://github.com/snek-at/jaen/commit/91a36ac01c4899d5a284b53c55e8e1416a125cbb))
* introduce BlockContainer (StreamField replacement) ([e89c100](https://github.com/snek-at/jaen/commit/e89c1002b05ed33f69240b128d129ddbea5cb362))


### Performance Improvements

* **blockcontainer:** memo blocks inside of container to reduce renderings ([db60407](https://github.com/snek-at/jaen/commit/db604079db6e15ea17d361a9e96c5e121b920d9c))

# [@snek-at/jaen-pages-v2.0.0-beta.21](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.20...@snek-at/jaen-pages-v2.0.0-beta.21) (2021-09-09)


### Bug Fixes

* make createFile function async ([ba94b8b](https://github.com/snek-at/jaen/commit/ba94b8b8d8a7ea86fb7272fdc066846e52ac09cf))

# [@snek-at/jaen-pages-v2.0.0-beta.20](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.19...@snek-at/jaen-pages-v2.0.0-beta.20) (2021-09-08)


### Bug Fixes

* **textfield:** set to full width in order to fix dissapearing issue ([e5f8a86](https://github.com/snek-at/jaen/commit/e5f8a86f51a10d4afc0debbd4743dd6a623d3634))


### Features

* **chakraui:** enfore chakraui through jaen ([bd539de](https://github.com/snek-at/jaen/commit/bd539de1513f7656f5a7a5ce2f30c8c1628f8967))
* **imagefield:** add build data for blocks ([7777174](https://github.com/snek-at/jaen/commit/7777174f391ed2f222b0ae850fb61b63a560323c))

# [@snek-at/jaen-pages-v2.0.0-beta.19](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.18...@snek-at/jaen-pages-v2.0.0-beta.19) (2021-09-08)


### Bug Fixes

* **choicefield:** enable popover only on editing ([4ee9231](https://github.com/snek-at/jaen/commit/4ee923178ab30045d44f0d74ec85c8995bc02c52))


### Features

* remove initialValue form StreamField ([1c60e15](https://github.com/snek-at/jaen/commit/1c60e15311338ff2f060269ed81812a4ef2b655a))

# [@snek-at/jaen-pages-v2.0.0-beta.18](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.17...@snek-at/jaen-pages-v2.0.0-beta.18) (2021-09-08)


### Bug Fixes

* change type to fix type error ([c272338](https://github.com/snek-at/jaen/commit/c27233809a2488b7836aa04b1a8109ca06eaab80))
* **imagefield:** image discard resets to context image now ([651d0a0](https://github.com/snek-at/jaen/commit/651d0a0f0f7fa7436dbaa28b6b37a7190212f041))
* **imagefield:** switch interface use correct types ([835da4d](https://github.com/snek-at/jaen/commit/835da4d4bf933df79cb20e76d6f2f60c5c834068))


### Features

* add ChoiceField ([115417b](https://github.com/snek-at/jaen/commit/115417b7a0fc9aca684df8ee068a87d58ce365bb))

# [@snek-at/jaen-pages-v2.0.0-beta.17](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.16...@snek-at/jaen-pages-v2.0.0-beta.17) (2021-09-07)


### Bug Fixes

* **package.json:** align versions ([35e74c1](https://github.com/snek-at/jaen/commit/35e74c170d136f28676228e8726794aec45cb642))
* **package.json:** update snekfinder version ([a764f35](https://github.com/snek-at/jaen/commit/a764f354abc83e43bf355c4efee57dc4c7e2b1d4))


### Features

* add options hook ([c4d7c20](https://github.com/snek-at/jaen/commit/c4d7c20e0b2bb00b31298a3f8b7eedcb03289ba7))
* jaenImage uses GatsbyImage now ([a28b99e](https://github.com/snek-at/jaen/commit/a28b99ec0e6bd83cb6359c4ff4783f6847e6a3a4))
* streamField not includes build data ([b12ff24](https://github.com/snek-at/jaen/commit/b12ff24803c3c7e82971fbe252bb0c333fec469e))

# [@snek-at/jaen-pages-v2.0.0-beta.16](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.15...@snek-at/jaen-pages-v2.0.0-beta.16) (2021-09-06)


### Bug Fixes

* **package.json:** align versions ([ca6fc14](https://github.com/snek-at/jaen/commit/ca6fc14c3ac34e6853d3c3d6afa894fe10dae445))

# [@snek-at/jaen-pages-v2.0.0-beta.15](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.14...@snek-at/jaen-pages-v2.0.0-beta.15) (2021-09-05)


### Bug Fixes

* disable page updating on page change ([cbd2656](https://github.com/snek-at/jaen/commit/cbd2656579947d62e03efaf00212ee6533d2cb95))
* **chakra:** reset css ([2d1d195](https://github.com/snek-at/jaen/commit/2d1d1956ae3c61f188696ea268625395cb1ffe37))
* **streamfield:** remove SFBWrapper on editing ([548653b](https://github.com/snek-at/jaen/commit/548653b033d95146a73f779ab274840fb04a57af))
* incorrect default selection ([950e5b6](https://github.com/snek-at/jaen/commit/950e5b64b831b0ed0157fd4bb0c110f97e4bcda4))
* page deleting ([f151188](https://github.com/snek-at/jaen/commit/f1511888a65e875f56f3f1bccb775a00ecac714a))


### Features

* add template name to page content ([69e75b8](https://github.com/snek-at/jaen/commit/69e75b8ac694aa35f6630bbd6fc5617e5671afa9))

# [@snek-at/jaen-pages-v2.0.0-beta.14](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.13...@snek-at/jaen-pages-v2.0.0-beta.14) (2021-09-04)


### Bug Fixes

* fix type error ([5ffba24](https://github.com/snek-at/jaen/commit/5ffba2401a38c4a0dd52e318f3bd0767121499a8))
* **indexfield:** fix page context ([74d6383](https://github.com/snek-at/jaen/commit/74d6383c5e52600dc64640e2e0e44c492110b758))
* **package.json:** update versions ([8ce78ef](https://github.com/snek-at/jaen/commit/8ce78ef6a1b494f06428845f9470fe0717a030f3))

# [@snek-at/jaen-pages-v2.0.0-beta.13](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.12...@snek-at/jaen-pages-v2.0.0-beta.13) (2021-09-04)


### Features

* add jaen-pages cli ([b2a9724](https://github.com/snek-at/jaen/commit/b2a972405f307e1682f5f72a23c1f026bbe9f2bb))

# [@snek-at/jaen-pages-v2.0.0-beta.12](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.11...@snek-at/jaen-pages-v2.0.0-beta.12) (2021-09-02)


### Bug Fixes

* remove optional chaining in esm module ([43ad1d2](https://github.com/snek-at/jaen/commit/43ad1d226812b84fa1280eb23b360fe21ef1fe59))

# [@snek-at/jaen-pages-v2.0.0-beta.11](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.10...@snek-at/jaen-pages-v2.0.0-beta.11) (2021-09-02)


### Bug Fixes

* page creaction and esm ([ab3bbda](https://github.com/snek-at/jaen/commit/ab3bbdabc37ae4ef14044bd6b29c4dfb80254362))

# [@snek-at/jaen-pages-v2.0.0-beta.10](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.9...@snek-at/jaen-pages-v2.0.0-beta.10) (2021-09-02)


### Bug Fixes

* **package.json:** align monorepo package versions ([69661f7](https://github.com/snek-at/jaen/commit/69661f761edc4aa6c0839cb0a588dd328ec098a5))


### Features

* add gatsby publishing ([83d2704](https://github.com/snek-at/jaen/commit/83d270482c60a7783b408c7f954e8e148e51e741))
* add jaen-pages migration workflow ([008918c](https://github.com/snek-at/jaen/commit/008918cc1c8d8ee88ad914f674b978ebc68e21c6))
* add jaenPageContext ([2bf4da1](https://github.com/snek-at/jaen/commit/2bf4da1a154de2db83ebbec6fad5cfa3a758053b))
* send publish request on button press ([75d5cfc](https://github.com/snek-at/jaen/commit/75d5cfcb35bcde7e7f3d455b44b9921e1dd2eefa))
* **auth:** add guest mode ([3431548](https://github.com/snek-at/jaen/commit/343154897e8b9794594b964b5f559c69e6cfdbc7))

# [@snek-at/jaen-pages-v2.0.0-beta.9](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.8...@snek-at/jaen-pages-v2.0.0-beta.9) (2021-09-01)


### Features

* compile plugins as es6 ([5473ed0](https://github.com/snek-at/jaen/commit/5473ed07dec4fbfdffa5df06f6a65dbba65177c7))

# [@snek-at/jaen-pages-v2.0.0-beta.8](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.7...@snek-at/jaen-pages-v2.0.0-beta.8) (2021-09-01)


### Bug Fixes

* remove transpiling ([9ec9b59](https://github.com/snek-at/jaen/commit/9ec9b59b69515bbdf3c47b77c9434ce2b38632f3))

# [@snek-at/jaen-pages-v2.0.0-beta.7](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.6...@snek-at/jaen-pages-v2.0.0-beta.7) (2021-08-31)


### Bug Fixes

* **.babelrc:** add preset-react ([36a0f2c](https://github.com/snek-at/jaen/commit/36a0f2cba18b74a4a2a20e94bdc9d61f29c7089b))

# [@snek-at/jaen-pages-v2.0.0-beta.6](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.5...@snek-at/jaen-pages-v2.0.0-beta.6) (2021-08-31)


### Bug Fixes

* **package.json:** add dist to files ([243b531](https://github.com/snek-at/jaen/commit/243b53141fc7069c1f3244a40f3fd683c987dcde))
* **package.json:** update version ([fe2aa5a](https://github.com/snek-at/jaen/commit/fe2aa5a3c8a24533cf12497f1c96166cfd91b159))

# [@snek-at/jaen-pages-v2.0.0-beta.5](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.4...@snek-at/jaen-pages-v2.0.0-beta.5) (2021-08-31)


### Bug Fixes

* enable transpiling ([037856a](https://github.com/snek-at/jaen/commit/037856a4bad791be351cc03b2afb29c65f9b8bff))

# [@snek-at/jaen-pages-v2.0.0-beta.4](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.3...@snek-at/jaen-pages-v2.0.0-beta.4) (2021-08-31)


### Bug Fixes

* fix incorrect import ([2f286a9](https://github.com/snek-at/jaen/commit/2f286a9cdb6d224d1e2387307840d10eb92d450a))
* **package.json:** remove files ([fdc78ca](https://github.com/snek-at/jaen/commit/fdc78caa8fb876c32b33c5c106bec046e4204dfe))
* **package.json:** update version ([bfd63ae](https://github.com/snek-at/jaen/commit/bfd63ae79015028cb65bc88c384c0a7afc111903))
* remove babel transpiling ([e443f18](https://github.com/snek-at/jaen/commit/e443f1889081f428ca7a724c732d29701182ae65))

# [@snek-at/jaen-pages-v2.0.0-beta.3](https://github.com/snek-at/jaen/compare/@snek-at/jaen-pages-v2.0.0-beta.2...@snek-at/jaen-pages-v2.0.0-beta.3) (2021-08-31)


### Bug Fixes

* **build:** build gatsby plugins with babel ([951ae23](https://github.com/snek-at/jaen/commit/951ae2391abbfa3ad9b1c4418558c48c095d60a3))
* **package.json:** fix jaen-shared-ui version ([c340a35](https://github.com/snek-at/jaen/commit/c340a3517111c0c28d415f787a4bd32f2b085c1e))


### Features

* **pageexplorer:** add dynamic routing ([7a36761](https://github.com/snek-at/jaen/commit/7a3676174ad0130091830c67cf6d6b88029b59e3))
