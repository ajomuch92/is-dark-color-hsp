// Función auxiliar para convertir HSL a RGB
const HSLToRGB = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

// Función para determinar si un color es oscuro
export const isDark = (color: string): boolean => {
  if (typeof color !== 'string') return false;

  let r: number, g: number, b: number;

  // Manejo de colores en formato RGB o RGBA
  if (color.match(/^rgb/)) {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!match) return false;
    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
  }
  // Manejo de colores en formato hexadecimal
  else if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    const hexColor = +("0x" + color.slice(1).replace(color.length < 5 ? /./g : /../g, '$&$&'));
    r = hexColor >> 16;
    g = hexColor >> 8 & 255;
    b = hexColor & 255;
  }
  // Manejo de colores en formato HSL
  else if (color.match(/^hsl/)) {
    const [h, s, l] = color.replace(/[^\d.,]/g, '').split(',').map(Number);
    [r, g, b] = HSLToRGB(h, s, l);
  } else {
    return false;
  }

  // Cálculo del brillo percibido
  const hsp = Math.sqrt(
    0.299 * Math.pow(r, 2) +
    0.587 * Math.pow(g, 2) +
    0.114 * Math.pow(b, 2)
  );

  return !(hsp > 127.5);
};

// Función para determinar si un color es claro
export const isLight = (color: string): boolean => {
  const result = isDark(color);
  if (result === null) return false;
  return !result;
};