import { Encoder } from "../../Encoder.ts";
import { Decoder } from "../../Decoder.ts";
import {
  range,
  UINT_8_MIN_VALUE,
  UINT_8_MAX_VALUE,
  UINT_16_MIN_VALUE,
  UINT_16_MAX_VALUE,
  UINT_32_MIN_VALUE,
  UINT_32_MAX_VALUE,
} from "../../helpers.ts";

export const uInt8DataType = {
  test(data: any) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_8_MIN_VALUE, UINT_8_MAX_VALUE);
  },
  encode(encoder: Encoder, data: number) {
    return encoder.uInt8ToBuffer(data);
  },
  decode(decoder: Decoder) {
    return decoder.stepUint8();
  },
};

export const uInt16DataType = {
  test(data: any) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_16_MIN_VALUE, UINT_16_MAX_VALUE);
  },
  encode(encoder: Encoder, data: number) {
    return encoder.uInt16ToBuffer(data);
  },
  decode(decoder: Decoder) {
    return decoder.stepUint16();
  },
};

export const uInt32DataType = {
  test(data: any) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_32_MIN_VALUE, UINT_32_MAX_VALUE);
  },
  encode(encoder: Encoder, data: number) {
    return encoder.uInt32ToBuffer(data);
  },
  decode(decoder: Decoder) {
    return decoder.stepUint32();
  },
};

// export const uInt64DataType = {
//   test(data: any) { return typeof data === "number" && Number.isInteger(data) && range(data, UINT_64_MIN_VALUE, UINT_64_MAX_VALUE) },
//   encode(encoder: Encoder, data: number) { return encoder.uInt64ToBuffer(data) },
//   decode(decoder: Decoder) { return decoder.stepUint64() }
// }
