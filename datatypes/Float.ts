import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import { range } from "../_util.ts";
import { DataType } from "../DataType.ts";

export class Float32DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && !Number.isInteger(data) &&
      Math.fround(data) === data && range(data, -1.7E+308, 1.7E+308);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.float32ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepFloat32();
  }
}

export class Float64DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && !Number.isInteger(data) &&
      range(data, -3.4E+38, 3.4E+38);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.float64ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepFloat64();
  }
}
