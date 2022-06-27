import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  INT_16_MIN_VALUE,
  INT_32_MIN_VALUE,
  INT_8_MIN_VALUE,
  range,
} from "../_util.ts";
import {
  NINT_16_MAX_VALUE,
  NINT_16_MIN_VALUE,
  NINT_32_MAX_VALUE,
  NINT_32_MIN_VALUE,
  NINT_8_MAX_VALUE,
  NINT_8_MIN_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class Nint8DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, NINT_8_MIN_VALUE, NINT_8_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeUint8(data - INT_8_MIN_VALUE);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint8() + INT_8_MIN_VALUE;
  }
}

export class Nint16DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, NINT_16_MIN_VALUE, NINT_16_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeUint16(data - INT_16_MIN_VALUE);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint16() + INT_16_MIN_VALUE;
  }
}

export class Nint32DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, NINT_32_MIN_VALUE, NINT_32_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeUint32(data - INT_32_MIN_VALUE);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint32() + INT_32_MIN_VALUE;
  }
}
