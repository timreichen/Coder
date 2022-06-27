import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class ArrayBuffer8DataType implements DataType {
  test(data: unknown) {
    return data instanceof ArrayBuffer && data.byteLength <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: ArrayBuffer) {
    const length = data.byteLength;
    return encoder.combineBuffers(encoder.encodeUint8(length), data);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint8();
    return decoder.decodeBuffer(length);
  }
}

export class ArrayBuffer16DataType implements DataType {
  test(data: unknown) {
    return data instanceof ArrayBuffer && data.byteLength <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: ArrayBuffer) {
    const length = data.byteLength;
    return encoder.combineBuffers(encoder.encodeUint16(length), data);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint16();
    return decoder.decodeBuffer(length);
  }
}

export class ArrayBuffer32DataType implements DataType {
  test(data: unknown) {
    return data instanceof ArrayBuffer && data.byteLength <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: ArrayBuffer) {
    const length = data.byteLength;
    return encoder.combineBuffers(encoder.encodeUint32(length), data);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint32();
    return decoder.decodeBuffer(length);
  }
}
