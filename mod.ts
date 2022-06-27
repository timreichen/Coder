import { Coder } from "./Coder.ts";
import { DateDataType } from "./data_types/Date.ts";

export { Coder } from "./Coder.ts";
export { Encoder } from "./Encoder.ts";
export { Decoder } from "./Decoder.ts";
export { DateDataType };

const coder = new Coder();

export function encode(data: unknown) {
  return coder.encode(data);
}
export function decode(buffer: ArrayBuffer) {
  return coder.decode(buffer);
}
