import { Encoder } from "../../Encoder.ts";
import { Decoder } from "../../Decoder.ts";
import {
  range,
  INT_8_MIN_VALUE,
  INT_8_MAX_VALUE,
  INT_16_MIN_VALUE,
  INT_16_MAX_VALUE,
  INT_32_MIN_VALUE,
  INT_32_MAX_VALUE,
} from "../../helpers.ts";

export const int8DataType = {
  test(data: any) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_8_MIN_VALUE, INT_8_MAX_VALUE);
  },
  encode(encoder: Encoder, data: number) {
    return encoder.int8ToBuffer(data);
  },
  decode(decoder: Decoder) {
    return decoder.stepUint8();
  },
};

export const int16DataType = {
  test(data: any) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_16_MIN_VALUE, INT_16_MAX_VALUE);
  },
  encode(encoder: Encoder, data: number) {
    return encoder.int16ToBuffer(data);
  },
  decode(decoder: Decoder) {
    return decoder.stepUint16();
  },
};

export const int32DataType = {
  test(data: any) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_32_MIN_VALUE, INT_32_MAX_VALUE);
  },
  encode(encoder: Encoder, data: number) {
    return encoder.int32ToBuffer(data);
  },
  decode(decoder: Decoder) {
    return decoder.stepUint32();
  },
};

// export const int64DataType = {
//   test(data: any) { return typeof data === "number" && Number.isInteger(data) && range(data, INT_64_MIN_VALUE, INT_64_MAX_VALUE) },
//   encode(encoder: Encoder, data: number) { return encoder.int64ToBuffer(data) },
//   decode(decoder: Decoder) { return decoder.stepUint64() }
// }
