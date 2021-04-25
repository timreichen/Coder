import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  range,
  UINT_16_MAX_VALUE,
  UINT_16_MIN_VALUE,
  UINT_32_MAX_VALUE,
  UINT_32_MIN_VALUE,
  UINT_8_MAX_VALUE,
  UINT_8_MIN_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export class Uint8DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_8_MIN_VALUE, UINT_8_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.uInt8ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint8();
  }
}

export class Uint16DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_16_MIN_VALUE, UINT_16_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.uInt16ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint16();
  }
}

export class Uint32DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, UINT_32_MIN_VALUE, UINT_32_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.uInt32ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint32();
  }
} // export class Uint64DataType extends DataType {
//   test(data: unknown) { return typeof data === "number" && Number.isInteger(data) && range(data, UINT_64_MIN_VALUE, UINT_64_MAX_VALUE) }
//   encode(encoder: Encoder, data: number) { return encoder.uInt64ToBuffer(data) }
//   decode(decoder: Decoder) { return decoder.stepUint64() }
// }
