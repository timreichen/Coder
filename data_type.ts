import type { Encoder } from "./encoder.ts";
import type { Decoder } from "./decoder.ts";

export interface DataType {
  test(data: unknown): boolean;
  encode(encoder: Encoder, data: unknown, id?: number): ArrayBuffer;
  decode(decoder: Decoder, id?: number): unknown;
}
