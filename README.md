# Is Dark Color HSP


This package helps to determine if a color is dark tone or light tone. It's useful to use a contrast color (as you can see on demo image using on an app) with other. It's based on HSP(Highly Sensitive Poo) color model, you can read more about it [here](http://alienryderflex.com/hsp.html).

<img src="https://raw.githubusercontent.com/ajomuch92/flutter-is-dark-color-hsp/master/assets/demo.gif" width="200" height="429"/>

## Installation
`npm install --save is-dark-color-hsp`

## Usage

```javascript
import isDarkColorHsp from 'is-dark-color'
// obvious
const whiteIsDark = isDarkColorHsp.isDark('#ffffff'); // false
const blackIsDark = isDarkColorHsp.isDark('rgb(0, 0 , 0)'); // true
const otherColor = isDarkColorHsp.isLight('#ff9900'); // true
const nonColor = isDarkColorHsp.isDark({}); // null

```

See this package for Flutter [here](https://pub.dev/packages/flutter_is_dark_color_hsp).