import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

const getType = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1);

export class FixedObjectDataType implements DataType {
  #length: number;
  constructor(length: number) {
    this.#length = length;
  }
  test(data: unknown) {
    return getType(data) === "Object" &&
      Object.keys(data as Record<string, unknown>).length === this.#length;
  }
  encode(encoder: Encoder, data: Record<string, unknown>) {
    return Object.entries(data).reduce(
      (buffer: ArrayBuffer, [key, value]: [unknown, unknown]) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      new ArrayBuffer(0),
    );
  }
  decode(decoder: Decoder) {
    const object: Record<string, unknown> = {};
    let len = this.#length;
    while (len--) {
      const key = decoder.decodeNext() as string;
      const value = decoder.decodeNext();
      object[key] = value;
    }
    return object;
  }
}

export class Object8DataType implements DataType {
  test(data: unknown) {
    return getType(data) === "Object" &&
      Object.keys(data as Record<string, unknown>).length <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Record<string, unknown>) {
    const length = Object.keys(data).length;
    return Object.entries(data).reduce(
      (buffer: ArrayBuffer, [key, value]: [unknown, unknown]) =>
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
    const object: Record<string, unknown> = {};
    while (length--) {
      const key = decoder.decodeNext() as string;
      const value = decoder.decodeNext();
      object[key] = value;
    }
    return object;
  }
}

export class Object16DataType implements DataType {
  test(data: unknown) {
    return getType(data) === "Object" &&
      Object.keys(data as Record<string, unknown>).length <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Record<string, unknown>) {
    const length = Object.keys(data).length;
    return Object.values(data).reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.encodeUint16(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint16();
    const object: Record<string, unknown> = {};
    while (length--) {
      const key = decoder.decodeNext() as string;
      const value = decoder.decodeNext();
      object[key] = value;
    }
    return object;
  }
}

export class Object32DataType implements DataType {
  test(data: unknown) {
    return getType(data) === "Object" &&
      Object.keys(data as Record<string, unknown>).length <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Record<string, unknown>) {
    const length = Object.keys(data).length;
    return Object.values(data).reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.encodeUint32(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.decodeUint32();
    const object: Record<string, unknown> = {};
    while (length--) {
      const key = decoder.decodeNext() as string;
      const value = decoder.decodeNext();
      object[key] = value;
    }
    return object;
  }
}
