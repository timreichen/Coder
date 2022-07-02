import { Coder } from "./coder.ts";
import { DateDataType } from "./data_types/date.ts";

export { Coder } from "./coder.ts";
export { Encoder } from "./encoder.ts";
export { Decoder } from "./decoder.ts";
export { DateDataType };

const coder = new Coder();

export function encode(data: unknown) {
  return coder.encode(data);
}
export function decode(buffer: ArrayBuffer) {
  return coder.decode(buffer);
}
