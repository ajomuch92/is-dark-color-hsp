// Helper function to convert HSL to RGB
export const HSLToRGB = (h: number, s: number, l: number): [number, number, number] => {
  // Normalize hue to 0-360 range
  h = h % 360;
  if (h < 0) h += 360;
  
  // Normalize saturation and lightness to 0-1 range
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
};

// Function to determine if a color is dark
export const isDark = (color: string): boolean | null => {
  // Validate that the input is a string
  if (typeof color !== 'string') return null;

  let r: number, g: number, b: number;

  // Handle colors in RGB or RGBA format
  if (color.match(/^rgba?/)) {
    const match = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)$/);
    if (!match) return null;
    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
  }
  // Handle colors in hexadecimal format
  else if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    const hex = color.slice(1);
    const fullHex = hex.length === 3 
      ? hex.split('').map(c => c + c).join('') 
      : hex;
    r = parseInt(fullHex.slice(0, 2), 16);
    g = parseInt(fullHex.slice(2, 4), 16);
    b = parseInt(fullHex.slice(4, 6), 16);
  }
  // Handle colors in HSL or HSLA format
  else if (color.match(/^hsla?/)) {
    const match = color.match(/^hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?(?:\s*,\s*[\d.]+)?\s*\)$/);
    if (!match) return null;
    const h = parseFloat(match[1]);
    const s = parseFloat(match[2]);
    const l = parseFloat(match[3]);
    [r, g, b] = HSLToRGB(h, s, l);
  } else {
    return null; // Invalid color format
  }

  // Validate RGB range
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return null;
  }

  // Calculate perceived brightness using the HSP equation
  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Return true if the color is dark, false otherwise
  return hsp < 127.5;
};

// Function to determine if a color is light
export const isLight = (color: string): boolean | null => {
  const result = isDark(color);
  if (result === null) return null;
  return !result;
};