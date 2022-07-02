import { Encoder } from "../encoder.ts";
import { Decoder } from "../decoder.ts";
import { DataType } from "../data_type.ts";

export class BigIntDataType implements DataType {
  test(data: unknown) {
    return typeof data === "bigint";
  }
  encode(encoder: Encoder, data: bigint) {
    const dataString = String(data);
    const dataBuffer = encoder.encodeString(dataString);
    const lengthBuffer = encoder.encodeUint32(dataBuffer.byteLength);
    return encoder.combineBuffers(lengthBuffer, dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint32();
    const data = decoder.decodeString(length);
    return BigInt(data);
  }
}
