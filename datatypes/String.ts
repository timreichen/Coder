import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import {
  UINT_16_MAX_VALUE,
  UINT_32_MAX_VALUE,
  UINT_8_MAX_VALUE,
} from "../_util.ts";
import { DataType } from "../DataType.ts";

export const fixedStringDataType = (length: number) =>
  new (class FixedStringDataType extends DataType {
    test(data: unknown) {
      return typeof data === "string" &&
        Encoder.stringToBuffer(data).byteLength === length;
    }
    encode(encoder: Encoder, data: string) {
      return encoder.stringToBuffer(data);
    }
    decode(decoder: Decoder) {
      return decoder.stepString(length);
    }
  })();

export class String8DataType extends DataType {
  test(data: unknown) {
    return typeof data === "string" &&
      Encoder.stringToBuffer(data).byteLength <= UINT_8_MAX_VALUE;
  }
  encode(encoder: Encoder, data: string) {
    const dataBuffer = encoder.stringToBuffer(data);
    const lengthBuffer = encoder.uInt8ToBuffer(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.stepUint8();
    return decoder.stepString(length);
  }
}

export class String16DataType extends DataType {
  test(data: unknown) {
    return typeof data === "string" &&
      Encoder.stringToBuffer(data).byteLength <= UINT_16_MAX_VALUE;
  }
  encode(encoder: Encoder, data: string) {
    const dataBuffer = encoder.stringToBuffer(data);
    const lengthBuffer = encoder.uInt16ToBuffer(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.stepUint16();
    return decoder.stepString(length);
  }
}

export class String32DataType extends DataType {
  test(data: unknown) {
    return typeof data === "string" &&
      Encoder.stringToBuffer(data).byteLength <= UINT_32_MAX_VALUE;
  }
  encode(encoder: Encoder, data: string) {
    const dataBuffer = encoder.stringToBuffer(data);
    const lengthBuffer = encoder.uInt32ToBuffer(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.stepUint32();
    return decoder.stepString(length);
  }
} // export class String64DataType extends DataType {
//   test(data: unknown) { return typeof data === "string" && Encoder.stringToBuffer(data).byteLength <= UINT_64_MAX_VALUE}
//   encode(encoder: Encoder, data: string) {
//     const dataBuffer = encoder.stringToBuffer(data)
//     const lengthBuffer = encoder.uInt64ToBuffer(dataBuffer.byteLength)
//     return encoder.combineBuffers(lengthBuffer, dataBuffer)
//   }
//   decode(decoder: Decoder) {
//     const length = decoder.stepUint64()
//     return decoder.stepString(length)
//   }
// }
