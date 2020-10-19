import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_8_MAX_VALUE,
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
} from "../_util.ts";

export const Map8DataType = {
  test(data: any) {
    return data instanceof Map && data.size <= UINT_8_MAX_VALUE;
  },
  encode(encoder: Encoder, data: Map<any, any>) {
    const length = data.size;
    console.log(data.size);

    return Array.from(data.entries()).reduce(
      (buffer: any, [key, value]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      encoder.uInt8ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const map = new Map();
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      map.set(key, value);
    }
    return map;
  },
};

export const Map16DataType = {
  test(data: any) {
    return data instanceof Map && data.size <= UINT_16_MAX_VALUE;
  },
  encode(encoder: Encoder, data: Map<any, any>) {
    const length = data.size;
    return Array.from(data.entries()).reduce(
      (buffer: any, [key, value]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      encoder.uInt16ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const map = new Map();
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      map.set(key, value);
    }
    return map;
  },
};

export const Map32DataType = {
  test(data: any) {
    return data instanceof Map && data.size <= UINT_32_MAX_VALUE;
  },
  encode(encoder: Encoder, data: Map<any, any>) {
    const length = data.size;
    return Array.from(data.entries()).reduce(
      (buffer: any, [key, value]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      encoder.uInt32ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const map = new Map();
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      map.set(key, value);
    }
    return map;
  },
};
