import { Encoder } from "../encoder.ts";
import { Decoder } from "../decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../data_type.ts";

export class FixedStringDataType implements DataType {
  #length: number;
  constructor(length: number) {
    this.#length = length;
  }
  test(data: unknown) {
    return typeof data === "string" &&
      data.length === this.#length;
  }
  encode(encoder: Encoder, data: string) {
    return encoder.encodeString(data);
  }
  decode(decoder: Decoder) {
    return decoder.decodeString(this.#length);
  }
}

export class String8DataType implements DataType {
  test(data: unknown) {
    return typeof data === "string" &&
      data.length <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: string) {
    const dataBuffer = encoder.encodeString(data);
    const lengthBuffer = encoder.encodeUint8(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint8();
    return decoder.decodeString(length);
  }
}

export class String16DataType implements DataType {
  test(data: unknown) {
    return typeof data === "string" &&
      data.length <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: string) {
    const dataBuffer = encoder.encodeString(data);
    const lengthBuffer = encoder.encodeUint16(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint16();
    return decoder.decodeString(length);
  }
}

export class String32DataType implements DataType {
  test(data: unknown) {
    return typeof data === "string" &&
      data.length <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: string) {
    const dataBuffer = encoder.encodeString(data);
    const lengthBuffer = encoder.encodeUint32(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint32();
    return decoder.decodeString(length);
  }
}
