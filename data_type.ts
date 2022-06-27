import type { Encoder } from "./Encoder.ts";
import type { Decoder } from "./Decoder.ts";

export interface DataType {
  test(data: unknown): boolean;
  encode(encoder: Encoder, data: unknown, id?: number): ArrayBuffer;
  decode(decoder: Decoder, id?: number): unknown;
}
