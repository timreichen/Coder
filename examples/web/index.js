import { coder } from "./Coder.js";
const encoded = coder.encode({ hello: "world" });
console.log(encoded);
console.log(coder.decode(encoded));
