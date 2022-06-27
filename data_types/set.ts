import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class Set8DataType implements DataType {
  test(data: unknown) {
    return data instanceof Set && data.size <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Set<unknown>) {
    const length = data.size;
    return [...data].reduce(
      (buffer: ArrayBuffer, value: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.encodeUint8(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint8();
    const set = new Set();
    while (length--) {
      const value = decoder.decodeNext();
      set.add(value);
    }
    return set;
  }
}

export class Set16DataType implements DataType {
  test(data: unknown) {
    return data instanceof Set && data.size <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Set<unknown>) {
    const length = data.size;
    return [...data].reduce(
      (buffer: ArrayBuffer, value: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.encodeUint16(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint16();
    const set = new Set();
    while (length--) {
      const value = decoder.decodeNext();
      set.add(value);
    }
    return set;
  }
}

export class Set32DataType implements DataType {
  test(data: unknown) {
    return data instanceof Set && data.size <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Set<unknown>) {
    const length = data.size;
    return [...data].reduce(
      (buffer: ArrayBuffer, value: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.encodeUint32(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint32();
    const set = new Set();
    while (length--) {
      const value = decoder.decodeNext();
      set.add(value);
    }
    return set;
  }
}
