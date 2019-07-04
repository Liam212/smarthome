const { Control } = require('magic-home');
const fs = require('fs');

let light = new Control("192.168.0.126");

let data = fs.readFileSync('modules/magichome/color.json');
let rgb = JSON.parse(data);

light.setColor(rgb.r,rgb.g,rgb.b);
console.log("200 OK",rgb);
