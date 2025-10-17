// .js default use CommonJS
// .mjs default use ES modules
// .cjs force CommonJS

import { sum, sub, mul, div } from "./sum.mjs";

console.log(sum(1, 2));
console.log(sub(1, 2));
console.log(mul(1, 2));
console.log(div(1, 2));
