import { DataType } from "../DataType.ts";
import { Decoder } from "../Decoder.ts";
import { Encoder } from "../Encoder.ts";

export const fixedValueDataType = (value: unknown) =>
  new (class FixedValueDataType extends DataType {
    test(data: unknown) {
      return data === value;
    }
    encode(_encoder: Encoder, _data: unknown) {
      return new ArrayBuffer(0);
    }
    decode(_decoder: Decoder) {
      return value;
    }
  })();
