const { Control } = require('magic-home');
const fs = require('fs');

let light = new Control("192.168.0.126");

let rawdata = fs.readFileSync('color.json');
let rgb = JSON.parse(rawdata);
console.log(rgb);

light.setColor(rgb[0],rgb[1],rgb[2]);
//modules/magichome/
