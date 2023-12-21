const gradient = require('gradient-string');

const successLoading = [
    '#33ff33',
    '#3399ff',
    '#00ccff',
    '#ff9933',
    '#ffff33'
];

const randomGradientloading = () => successLoading[Math.floor(Math.random() * successLoading.length)];
const crayon = (message) => gradient([randomGradientloading(), randomGradientloading()])(`[ SUCCESS ] » ${message}\n`);

const faildedLoading = [
    '#FF0004',
    '#8B0000'
];

const randomGradientfailde = () => faildedLoading[Math.floor(Math.random() * faildedLoading.length)];
const crayons = (message) => gradient([randomGradientfailde(), randomGradientfailde()])(`[ FAILED ] » ${message}\n`);

module.exports = { crayon, crayons };
