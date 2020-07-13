import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";

export const RegExpDataType = {
  test(data: any) {
    return data instanceof RegExp;
  },
  encode(encoder: Encoder, data: RegExp) {
    const string = data.source;
    const dataBuffer = encoder.stringToBuffer(string);
    const length = dataBuffer.byteLength;
    return encoder.combineBuffers(encoder.uInt16ToBuffer(length), dataBuffer);
  },
  decode(decoder: Decoder) {
    const length = decoder.stepUint16();
    const string = decoder.stepString(length);
    return new RegExp(string);
  },
};
