import { Encoder } from "../encoder.ts";
import { Decoder } from "../decoder.ts";
import { DataType } from "../data_type.ts";

export class RegExpDataType implements DataType {
  test(data: unknown) {
    return data instanceof RegExp;
  }
  encode(encoder: Encoder, data: RegExp) {
    const string = data.source;
    const dataBuffer = encoder.encodeString(string);
    const length = dataBuffer.byteLength;
    return encoder.combineBuffers(encoder.encodeUint16(length), dataBuffer);
  }
  decode(decoder: Decoder) {
    const length = decoder.decodeUint16();
    const string = decoder.decodeString(length);
    return new RegExp(string);
  }
}
