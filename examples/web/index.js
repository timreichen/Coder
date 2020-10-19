import { coder } from "./coder.js";

const data = {
  hello: "world",
  array: [true, false, 1.3, BigInt(12n)],
  date: new Date(),
};
const encoded = coder.encode(data);
const decoded = coder.decode(encoded);
