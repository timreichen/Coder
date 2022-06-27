import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import { range } from "../_util.ts";
import { DataType } from "../data_type.ts";

export class Float32DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && !Number.isInteger(data) &&
      Math.fround(data) === data && range(data, -1.7E+308, 1.7E+308);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeFloat32(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeFloat32();
  }
}

export class Float64DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && !Number.isInteger(data) &&
      range(data, -3.4E+38, 3.4E+38);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeFloat64(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeFloat64();
  }
}
