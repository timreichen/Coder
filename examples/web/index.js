import { coder } from "./coder.js";
const date = new Date(2020, 1, 1, 0, 0, 0, 0);
const encoded = coder.encode(date);
const decoded = coder.decode(encoded);
console.log(date.getTime() === decoded.getTime());
