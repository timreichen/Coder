import { DataType } from "../DataType.ts";
import { Decoder } from "../Decoder.ts";
import { Encoder } from "../Encoder.ts";

export const fixedValueDataType = (value: unknown) =>
  new (class FixedValueDataType extends DataType {
    test(data: unknown) {
      return data === value;
    }
    encode(encoder: Encoder, data: unknown) {
      return new ArrayBuffer(0);
    }
    decode(decoder: Decoder) {
      return value;
    }
  })();
