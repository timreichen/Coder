import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";

export const fixedArrayDataType = (length: number) => ({
  test(data: any) {
    return data instanceof Array && data.length === length;
  },
  encode(encoder: Encoder, data: any) {
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      new ArrayBuffer(0),
    );
  },
  decode(decoder: Decoder) {
    const array: any[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  },
});

export const Array8DataType = {
  test(data: any) {
    return data instanceof Array && data.length <= UINT_8_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = data.length;
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt8ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const array: any[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  },
};
export const Array16DataType = {
  test(data: any) {
    return data instanceof Array && data.length <= UINT_16_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = data.length;
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt16ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const array: any[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  },
};
export const Array32DataType = {
  test(data: any) {
    return data instanceof Array && data.length <= UINT_32_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = data.length;
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt32ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const array: any[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  },
};
