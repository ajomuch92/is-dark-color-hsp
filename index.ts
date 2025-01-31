// Helper function to convert HSL to RGB
export const HSLToRGB = (h: number, s: number, l: number): [number, number, number] => {
  // Normalize saturation and lightness to a range of 0-1
  s /= 100;
  l /= 100;
  // Calculate the chroma and intermediate values
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  
  // Return the RGB values as integers
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

// Function to determine if a color is dark
export const isDark = (color: string): boolean | null => {
  // Validate that the input is a string
  if (typeof color !== 'string') return null;

  let r: number, g: number, b: number;

  // Handle colors in RGB or RGBA format
  if (color.match(/^rgb/)) {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!match) return null;
    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
  }
  // Handle colors in hexadecimal format
  else if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    const hexColor = +("0x" + color.slice(1).replace(color.length < 5 ? /./g : /../g, '$&$&'));
    r = hexColor >> 16;
    g = hexColor >> 8 & 255;
    b = hexColor & 255;
  }
  // Handle colors in HSL format
  else if (color.match(/^hsl/)) {
    const [h, s, l] = color.replace(/[^\d.,]/g, '').split(',').map(Number);
    [r, g, b] = HSLToRGB(h, s, l);
  } else {
    return null; // Invalid color format
  }

  // Calculate perceived brightness using the HSP equation
  const hsp = Math.sqrt(
    0.299 * Math.pow(r, 2) +
    0.587 * Math.pow(g, 2) +
    0.114 * Math.pow(b, 2)
  );

  // Return true if the color is dark, false otherwise
  return !(hsp > 127.5);
};

// Function to determine if a color is light
export const isLight = (color: string): boolean | null => {
  // Use the isDark function to determine if the color is light
  const result = isDark(color);
  if (result === null) return null;
  return !result;
};