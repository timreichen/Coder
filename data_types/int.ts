import { Encoder } from "../encoder.ts";
import { Decoder } from "../decoder.ts";
import {
  INT_16_MAX_VALUE,
  INT_16_MIN_VALUE,
  INT_32_MAX_VALUE,
  INT_32_MIN_VALUE,
  INT_8_MAX_VALUE,
  INT_8_MIN_VALUE,
  range,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class Int8DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_8_MIN_VALUE, INT_8_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeInt8(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint8();
  }
}

export class Int16DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_16_MIN_VALUE, INT_16_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeInt16(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint16();
  }
}

export class Int32DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_32_MIN_VALUE, INT_32_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeInt32(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint32();
  }
}
