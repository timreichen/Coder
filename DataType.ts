import { Encoder } from "./Encoder.ts";
import { Decoder } from "./Decoder.ts";

export interface DataType {
  test(data: any): boolean;
  encode(encoder: Encoder, data: any, id?: number): ArrayBuffer;
  decode(decoder: Decoder, id?: number): any;
}
