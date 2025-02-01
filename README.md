# Is Dark Color HSP

This package helps to determine if a color is dark tone or light tone. It's useful to use a contrast color (as you can see on demo image using on an app) with other. It's based on HSP(Highly Sensitive Poo) color model, you can read more about it [here](http://alienryderflex.com/hsp.html).

See an example [here](https://github.com/ajomuch92/is-dark-color-hsp/blob/master/example/index.js)

<img src="https://raw.githubusercontent.com/ajomuch92/flutter-is-dark-color-hsp/master/assets/demo.gif" width="200" height="429"/>

## Installation

`npm install --save is-dark-color-hsp`

## Usage

```javascript
import isDarkColorHsp from "is-dark-color-hsp"; // you can import them individually as `import { isDark, isLight } from 'is-dark-color-hsp'`

const whiteIsDark = isDarkColorHsp.isDark("#ffffff"); // false
const blackIsDark = isDarkColorHsp.isDark("rgb(0, 0, 0)"); // true
const otherColor = isDarkColorHsp.isLight("#ff9900"); // true
const otherColor = isDarkColorHsp.isDark("hsl(142, 42%, 42%)"); // true
const nonColor = isDarkColorHsp.isDark({}); // null
```

## Breaking changes 💥

The package is now built using TypeScript, while the core functionality remains unchanged. If you encounter any issues or have suggestions, please feel free to open an issue.
