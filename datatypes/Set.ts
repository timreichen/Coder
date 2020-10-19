import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";

export const Set8DataType = {
  test(data: any) {
    return data instanceof Set && data.size <= UINT_8_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = data.size;
    return data.reduce(
      (buffer: any, value: any) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.uInt8ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const set = new Set();
    while (length--) {
      const value = decoder.next();
      set.add(value);
    }
    return set;
  },
};

export const Set16DataType = {
  test(data: any) {
    return data instanceof Set && data.size <= UINT_16_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = data.size;
    return data.reduce(
      (buffer: any, value: any) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.uInt16ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const set = new Set();
    while (length--) {
      const value = decoder.next();
      set.add(value);
    }
    return set;
  },
};

export const Set32DataType = {
  test(data: any) {
    return data instanceof Set && data.size <= UINT_32_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = data.size;
    return data.reduce(
      (buffer: any, value: any) =>
        encoder.combineBuffers(buffer, encoder.encode(value)),
      encoder.uInt32ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const set = new Set();
    while (length--) {
      const value = decoder.next();
      set.add(value);
    }
    return set;
  },
};
