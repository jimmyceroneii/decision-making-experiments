import ejs from "ejs";
import fs from 'fs';

const templateString = fs.readFileSync('src/index.ejs', 'utf-8');

let html = ejs.render(templateString, { things: ['me'] });

console.log(html)