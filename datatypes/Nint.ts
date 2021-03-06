import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  INT_16_MIN_VALUE,
  INT_32_MIN_VALUE,
  INT_8_MIN_VALUE,
  range,
} from "../_util.ts";
import {
  NINT_16_MAX_VALUE,
  NINT_16_MIN_VALUE,
  NINT_32_MAX_VALUE,
  NINT_32_MIN_VALUE,
  NINT_8_MAX_VALUE,
  NINT_8_MIN_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export class Nint8DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, NINT_8_MIN_VALUE, NINT_8_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.uInt8ToBuffer(data - INT_8_MIN_VALUE);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint8() + INT_8_MIN_VALUE;
  }
}

export class Nint16DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, NINT_16_MIN_VALUE, NINT_16_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.uInt16ToBuffer(data - INT_16_MIN_VALUE);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint16() + INT_16_MIN_VALUE;
  }
}

export class Nint32DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, NINT_32_MIN_VALUE, NINT_32_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.uInt32ToBuffer(data - INT_32_MIN_VALUE);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint32() + INT_32_MIN_VALUE;
  }
} // export class Nint64DataType extends DataType {
//   test(data: unknown) { typeof data === "number" &&  Number.isInteger(data) && range(data, NINT_64_MIN_VALUE, NINT_64_MAX_VALUE)}
//   encode(encoder: Encoder, data: number) { encoder.uInt64ToBuffer(data +UINT_64_MAX_VALUE / 2)}
//   decode(decoder: Decoder) { decoder.stepUint64() -UINT_64_MAX_VALUE / 2}
// }
