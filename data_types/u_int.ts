import { Encoder } from "../encoder.ts";
import { Decoder } from "../decoder.ts";
import {
  range,
  UINT_16_MAX_VALUE,
  UINT_16_MIN_VALUE,
  UINT_32_MAX_VALUE,
  UINT_32_MIN_VALUE,
  UINT_8_MAX_VALUE,
  UINT_8_MIN_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class Uint8DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_8_MIN_VALUE, UINT_8_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeUint8(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint8();
  }
}

export class Uint16DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_16_MIN_VALUE, UINT_16_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeUint16(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint16();
  }
}

export class Uint32DataType implements DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_32_MIN_VALUE, UINT_32_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.encodeUint32(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeUint32();
  }
}
