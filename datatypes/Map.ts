import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export class Map8DataType extends DataType {
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
      encoder.uInt8ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const map = new Map();
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      map.set(key, value);
    }
    return map;
  }
}

export class Map16DataType extends DataType {
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
      encoder.uInt16ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const map = new Map();
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      map.set(key, value);
    }
    return map;
  }
}

export class Map32DataType extends DataType {
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
      encoder.uInt32ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const map = new Map();
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      map.set(key, value);
    }
    return map;
  }
}
