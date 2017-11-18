# &lt;good-vibrations&gt;

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/kcmr/good-vibrations)

> `<good-vibrations>` is a component meant to be used as a singleton, that uses the [Vibration API](https://developer.mozilla.org/docs/Web/API/Vibration_API) to emit vibrations in browsers that support it.   
__[&lt;good-vibrations&gt; demo](http://kcmr.github.io/good-vibrations/)__

<p align="center">
  <a href="http://kcmr.github.io/good-vibrations/"><img src="https://raw.githubusercontent.com/kcmr/good-vibrations/master/good-vibrations.png" alt="Live demo"></a>
</p>


## Installation and import

Install the component using [Bower](http://bower.io/):

```bash
$ bower i -S good-vibrations
```

Import Web Components loader (optional) and the component:

```html
<script src="bower_components/webcomponentsjs/webcomponents-loader.js"></script>
<link rel="import" href="bower_components/good-vibrations/good-vibrations.html"> 
```

## Usage

__Example:__
```html
<good-vibrations vibrate duration="100"></good-vibrations>
```

__Example with vibration / silence intervals:__
```html
<good-vibrations vibrate duration="100,200,50,100,50,100,100,200,200,400,100,200,200"></good-vibrations>
```

__Canceling any running vibration:__
```js
document.querySelector('good-vibrations').cancel();
```

Or declaratively using the boolean attribute `mute`:
```html
<good-vibrations mute></good-vibrations>
```

__Get Vibration API support:__
```html
<good-vibrations vibration-supported="{{apiSupported}}"></good-vibrations>

<template is="dom-if" if="[[!apiSupported]]">
  <p>Vibration API not supported</p>
</template>
```

## Development

browserSync and eslint support.   
`eslint` and `eslint --fix` are enabled by default. Edit tasks/config.json to change the default configuration.

1. Install npm dependencies: `npm install`
2. Launch the component's demo: `npm run serve`


