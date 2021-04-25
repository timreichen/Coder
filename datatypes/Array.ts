import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export const fixedArrayDataType = (length: number) =>
  new (class FixedArrayDataType extends DataType {
    test(data: unknown) {
      return data instanceof Array && data.length === length;
    }
    encode(encoder: Encoder, data: Array<unknown>) {
      return data.reduce(
        (buffer: ArrayBuffer, item: unknown) =>
          encoder.combineBuffers(buffer, encoder.encode(item)),
        new ArrayBuffer(0),
      );
    }
    decode(decoder: Decoder) {
      const array: unknown[] = [];
      let len = length;
      while (len--) {
        const item = decoder.next();
        array.push(item);
      }
      return array;
    }
  })();

export class Array8DataType extends DataType {
  test(data: unknown) {
    return data instanceof Array && data.length <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Array<unknown>) {
    const length = data.length;
    return data.reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt8ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const array: unknown[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  }
}
export class Array16DataType extends DataType {
  test(data: unknown) {
    return data instanceof Array && data.length <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Array<unknown>) {
    const length = data.length;
    return data.reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt16ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const array: unknown[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  }
}
export class Array32DataType extends DataType {
  test(data: unknown) {
    return data instanceof Array && data.length <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Array<unknown>) {
    const length = data.length;
    return data.reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt32ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const array: unknown[] = [];
    while (length--) {
      const item = decoder.next();
      array.push(item);
    }
    return array;
  }
}
