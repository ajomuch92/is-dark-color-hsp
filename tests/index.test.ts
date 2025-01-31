import { isDark, isLight, HSLToRGB } from '../index';

describe('HSLToRGB', () => {
  test('convierte HSL a RGB correctamente', () => {
    const [r, g, b] = HSLToRGB(0, 100, 50); // Red
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);

    const [r2, g2, b2] = HSLToRGB(120, 100, 50); // Green
    expect(r2).toBe(0);
    expect(g2).toBe(255);
    expect(b2).toBe(0);

    const [r3, g3, b3] = HSLToRGB(240, 100, 50); // Blue
    expect(r3).toBe(0);
    expect(g3).toBe(0);
    expect(b3).toBe(255);
  });
});

describe('isDark', () => {
  test('Check dark colors in format RGB', () => {
    expect(isDark('rgb(0, 0, 0)')).toBe(true); // Black
    expect(isDark('rgb(255, 255, 255)')).toBe(false); // White
    expect(isDark('rgb(100, 100, 100)')).toBe(true); // Light gray
  });

  test('Check dark colors in format hexadecimal', () => {
    expect(isDark('#000000')).toBe(true); // Black
    expect(isDark('#FFFFFF')).toBe(false); // White
    expect(isDark('#808080')).toBe(false); // Light gray
    expect(isDark('#333')).toBe(true); // Hex short (Dark)
    expect(isDark('#CCC')).toBe(false); // Hex short (light)
  });

  test('Check dark colors in format HSL', () => {
    expect(isDark('hsl(0, 0%, 0%)')).toBe(true); // Black
    expect(isDark('hsl(0, 0%, 100%)')).toBe(false); // White
    expect(isDark('hsl(0, 0%, 20%)')).toBe(true); // Dark
    expect(isDark('hsl(0, 0%, 80%)')).toBe(false); // light
  });

  test('Invalid values', () => {
    expect(isDark('invalid-color')).toBe(null); // Invalid color
  });
});

describe('isLight', () => {
  test('Check light colors in format RGB', () => {
    expect(isLight('rgb(0, 0, 0)')).toBe(false); // Black
    expect(isLight('rgb(255, 255, 255)')).toBe(true); // White
    expect(isLight('rgb(200, 200, 200)')).toBe(true); // Light grey
  });

  test('Check light colors in format hexadecimal', () => {
    expect(isLight('#000000')).toBe(false); // Black
    expect(isLight('#FFFFFF')).toBe(true); // White
    expect(isLight('#CCCCCC')).toBe(true); // Light grey
    expect(isLight('#FFF')).toBe(true); // Hex short (light)
    expect(isLight('#333')).toBe(false); // Hex short (Dark)
  });

  test('Check light colors in format HSL', () => {
    expect(isLight('hsl(0, 0%, 0%)')).toBe(false); // Black
    expect(isLight('hsl(0, 0%, 100%)')).toBe(true); // White
    expect(isLight('hsl(0, 0%, 80%)')).toBe(true); // light
    expect(isLight('hsl(0, 0%, 20%)')).toBe(false); // Dark
  });

  test('Invalid values', () => {
    expect(isLight('invalid-color')).toBe(null); // Invalid color
  });
});