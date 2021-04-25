import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

const getType = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1);

export const fixedObjectDataType = (length: number) =>
  new (class FixedObjectDataType extends DataType {
    test(data: unknown) {
      return getType(data) === "Object" &&
        Object.keys(data as Record<string, unknown>).length === length;
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
      let len = length;
      while (len--) {
        const key = decoder.next() as string;
        const value = decoder.next();
        object[key] = value;
      }
      return object;
    }
  })();

export class Object8DataType extends DataType {
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
      encoder.uInt8ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const object: Record<string, unknown> = {};
    while (length--) {
      const key = decoder.next() as string;
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  }
}

export class Object16DataType extends DataType {
  test(data: unknown) {
    return getType(data) === "Object" &&
      Object.keys(data as Record<string, unknown>).length <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Record<string, unknown>) {
    const length = Object.keys(data).length;
    return Object.values(data).reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt16ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const object: Record<string, unknown> = {};
    while (length--) {
      const key = decoder.next() as string;
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  }
}

export class Object32DataType extends DataType {
  test(data: unknown) {
    return getType(data) === "Object" &&
      Object.keys(data as Record<string, unknown>).length <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: Record<string, unknown>) {
    const length = Object.keys(data).length;
    return Object.values(data).reduce(
      (buffer: ArrayBuffer, item: unknown) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt32ToBuffer(length),
    );
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const object: Record<string, unknown> = {};
    while (length--) {
      const key = decoder.next() as string;
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  }
}
