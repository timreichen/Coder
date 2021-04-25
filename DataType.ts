import type { Encoder } from "./Encoder.ts";
import type { Decoder } from "./Decoder.ts";

export interface DataType {
  test(data: unknown): boolean;
  encode(encoder: Encoder, data: unknown, id?: number): ArrayBuffer;
  // deno-lint-ignore no-explicit-any
  decode(decoder: Decoder, id?: number): any;
}

export class DataType {
}
