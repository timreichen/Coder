import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class Map8DataType implements DataType {
  test(data: unknown) {
    return data instanceof Map && data.size <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Map<unknown, unknown>) {
    const length = data.size;
    return Array.from(data.entries()).reduce(
      (buffer: ArrayBuffer, [key, value]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      encoder.encodeUint8(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint8();
    const map = new Map();
    while (length--) {
      const key = decoder.decodeNext();
      const value = decoder.decodeNext();
      map.set(key, value);
    }
    return map;
  }
}

export class Map16DataType implements DataType {
  test(data: unknown) {
    return data instanceof Map && data.size <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Map<unknown, unknown>) {
    const length = data.size;
    return Array.from(data.entries()).reduce(
      (buffer: ArrayBuffer, [key, value]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      encoder.encodeUint16(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint16();
    const map = new Map();
    while (length--) {
      const key = decoder.decodeNext();
      const value = decoder.decodeNext();
      map.set(key, value);
    }
    return map;
  }
}

export class Map32DataType implements DataType {
  test(data: unknown) {
    return data instanceof Map && data.size <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Map<unknown, unknown>) {
    const length = data.size;
    return Array.from(data.entries()).reduce(
      (buffer: ArrayBuffer, [key, value]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      encoder.encodeUint32(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint32();
    const map = new Map();
    while (length--) {
      const key = decoder.decodeNext();
      const value = decoder.decodeNext();
      map.set(key, value);
    }
    return map;
  }
}
