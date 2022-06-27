import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class FixedArrayDataType implements DataType {
  #length: number;
  constructor(length: number) {
    this.#length = length;
  }
  test(data: unknown) {
    return data instanceof Array && data.length === this.#length;
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
    let len = this.#length;
    while (len--) {
      const item = decoder.decodeNext();
      array.push(item);
    }
    return array;
  }
}

export class Array8DataType implements DataType {
  test(data: unknown) {
    return data instanceof Array && data.length <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Array<unknown>) {
    const length = data.length;
    return data.reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.encodeUint8(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint8();
    const array: unknown[] = [];
    while (length--) {
      const item = decoder.decodeNext();
      array.push(item);
    }
    return array;
  }
}
export class Array16DataType implements DataType {
  test(data: unknown) {
    return data instanceof Array && data.length <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Array<unknown>) {
    const length = data.length;
    return data.reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.encodeUint16(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint16();
    const array: unknown[] = [];
    while (length--) {
      const item = decoder.decodeNext();
      array.push(item);
    }
    return array;
  }
}
export class Array32DataType implements DataType {
  test(data: unknown) {
    return data instanceof Array && data.length <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Array<unknown>) {
    const length = data.length;
    return data.reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.encodeUint32(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint32();
    const array: unknown[] = [];
    while (length--) {
      const item = decoder.decodeNext();
      array.push(item);
    }
    return array;
  }
}
