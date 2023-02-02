export default {
  isDark(color) {
    if (typeof color !== 'string')
      return null;
    let r, g, b;
    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    } else if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
      color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    } else if (color.match(/^hsl/)) {
      const [h, s, l] = color.replace(/[^\d.,]/g, '').split(',').map(Number);
      [r, g, b] = HSLToRGB(h, s, l);
    } else {
      return null;
    }

    const hsp = Math.sqrt(
      0.299 * Math.pow(r, 2) +
      0.587 * Math.pow(g, 2) +
      0.114 * Math.pow(b, 2)
    );

    return !(hsp > 127.5);
  },
  isLight(color) {
    const result = this.isDark(color);
    if (result === null)
      return null;
    return !result;
  }
}

const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};