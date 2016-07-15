# flow.js

[![Build Status](https://travis-ci.org/shishidosoichiro/flow.js.svg?branch=master)](https://travis-ci.org/shishidosoichiro/flow.js)
[![Coverage Status](https://coveralls.io/repos/github/shishidosoichiro/flow.js/badge.svg?branch=master)](https://coveralls.io/github/shishidosoichiro/flow.js?branch=master)

Creates a function that returns 

```js
var yamlToJson = flow(YAML.parse, JSON.stringify)
yamlToJson('name: tom')
// -> {"name": "tom"}

var postFile = flow(fs.readFileSync, postToHttpServerReturnPromise)

postFile('book/1q84.epub')
.then(function(res){
	console.log(`statusCode: ${res.statusCode}`);
})
```

## API

### `flow([funcs])`

#### Arguments

1. `[funcs]` _(…(Function|Object|String|Number))_: Functions to invoke. each function can return Promsie.

#### Returns

(Function): Returns the new composite function.

## Installation

```sh
npm install https://github.com/shishidosoichiro/flow.js
```

```js
var flow = require('flow');
```

