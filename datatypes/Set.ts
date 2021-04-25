import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export class Set8DataType extends DataType {
  test(data: unknown) {
    return data instanceof Set && data.size <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Set<unknown>) {
    const length = data.size;
    return [...data].reduce(
      (buffer: ArrayBuffer, value: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.uInt8ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const set = new Set();
    while (length--) {
      const value = decoder.next();
      set.add(value);
    }
    return set;
  }
}

export class Set16DataType extends DataType {
  test(data: unknown) {
    return data instanceof Set && data.size <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Set<unknown>) {
    const length = data.size;
    return [...data].reduce(
      (buffer: ArrayBuffer, value: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.uInt16ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const set = new Set();
    while (length--) {
      const value = decoder.next();
      set.add(value);
    }
    return set;
  }
}

export class Set32DataType extends DataType {
  test(data: unknown) {
    return data instanceof Set && data.size <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Set<unknown>) {
    const length = data.size;
    return [...data].reduce(
      (buffer: ArrayBuffer, value: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.uInt32ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const set = new Set();
    while (length--) {
      const value = decoder.next();
      set.add(value);
    }
    return set;
  }
}
