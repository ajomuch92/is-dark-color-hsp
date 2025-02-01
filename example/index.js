import isDarkColorHsp from "is-dark-color-hsp";

const whiteIsDark = isDarkColorHsp.isDark("#ffffff"); // false
const blackIsDark = isDarkColorHsp.isDark("rgb(0, 0, 0)"); // true
const otherColor = isDarkColorHsp.isLight("#ff9900"); // true
const otherColor2 = isDarkColorHsp.isDark("hsl(142, 42%, 42%)"); // true
const nonColor = isDarkColorHsp.isDark({}); // null

console.log({
    whiteIsDark,
    blackIsDark,
    otherColor,
    otherColor2,
    nonColor,
});