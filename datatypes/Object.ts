import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";

const getType = (value: any) =>
  Object.prototype.toString.call(value).slice(8, -1);

export const fixedObjectDataType = (length: number) => ({
  test(data: any) {
    return getType(data) === "Object" && Object.keys(data).length === length;
  },
  encode(encoder: Encoder, data: any) {
    return Object.entries(data).reduce(
      (buffer: any, [key, value]: any) =>
        encoder.combineBuffers(
          buffer,
          encoder.encode(key),
          encoder.encode(value),
        ),
      new ArrayBuffer(0),
    );
  },
  decode(decoder: Decoder) {
    const object: { [key: string]: any } = {};
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  },
});

export const Object8DataType = {
  test(data: any) {
    return getType(data) === "Object" &&
      Object.keys(data).length <= UINT_8_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length;
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt8ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint8();
    const object: { [key: string]: any } = {};
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  },
};

export const Object16DataType = {
  test(data: any) {
    return getType(data) === "Object" &&
      Object.keys(data).length <= UINT_16_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length;
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt16ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint16();
    const object: { [key: string]: any } = {};
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  },
};

export const Object32DataType = {
  test(data: any) {
    return getType(data) === "Object" &&
      Object.keys(data).length <= UINT_32_MAX_VALUE;
  },
  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length;
    return data.reduce(
      (buffer: any, item: any) =>
        encoder.combineBuffers(buffer, encoder.encode(item)),
      encoder.uInt32ToBuffer(length),
    );
  },
  decode(decoder: Decoder) {
    let length = decoder.stepUint32();
    const object: { [key: string]: any } = {};
    while (length--) {
      const key = decoder.next();
      const value = decoder.next();
      object[key] = value;
    }
    return object;
  },
};
