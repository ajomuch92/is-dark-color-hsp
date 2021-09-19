export default {
  isDark(color) {
    if (typeof color !== 'string')
      return null;
    let r, g, b;
    const newColor = color.replace(/#/g, '');
    const parseHex = parseInt(newColor, 16)
    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    } else if (!isNaN(parseHex) && parseHex < 4096) {
      color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    } else {
      return null;
    }

    const hsp = Math.sqrt(
      0.299 * Math.pow(r, 2) +
      0.587 * Math.pow(g, 2) +
      0.114 * Math.pow(b, 2)
    );

    if (hsp > 127.5) {
      return false;
    } else {
      return true;
    }
  },
  isLight(color) {
    const result = this.isDark(color);
    if (result === null)
      return null;
    return !result;
  }
}