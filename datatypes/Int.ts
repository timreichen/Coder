import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  INT_16_MAX_VALUE,
  INT_16_MIN_VALUE,
  INT_32_MAX_VALUE,
  INT_32_MIN_VALUE,
  INT_8_MAX_VALUE,
  INT_8_MIN_VALUE,
  range,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export class Int8DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_8_MIN_VALUE, INT_8_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.int8ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint8();
  }
}

export class Int16DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_16_MIN_VALUE, INT_16_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.int16ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint16();
  }
}

export class Int32DataType extends DataType {
  test(data: unknown) {
    return typeof data === "number" && Number.isInteger(data) &&
      range(data, INT_32_MIN_VALUE, INT_32_MAX_VALUE);
  }
  encode(encoder: Encoder, data: number) {
    return encoder.int32ToBuffer(data);
  }
  decode(decoder: Decoder) {
    return decoder.stepUint32();
  }
}
// export class Int64DataType extends DataType {
//   test(data: unknown) { return typeof data === "number" && Number.isInteger(data) && range(data, INT_64_MIN_VALUE, INT_64_MAX_VALUE) }
//   encode(encoder: Encoder, data: number) { return encoder.int64ToBuffer(data) }
//   decode(decoder: Decoder) { return decoder.stepUint64() }
// }
