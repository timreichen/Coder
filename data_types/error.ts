import { Encoder } from "../encoder.ts";
import { Decoder } from "../decoder.ts";
import { DataType } from "../data_type.ts";

export class ErrorDataType implements DataType {
  test(data: unknown) {
    return data instanceof Error;
  }
  encode(encoder: Encoder, data: Error) {
    const nameBuffer = encoder.encodeString(data.name);
    const nameLengthBuffer = encoder.encodeUint8(nameBuffer.byteLength);
    const messageBuffer = encoder.encodeString(data.message);
    const messageLengthBuffer = encoder.encodeUint8(messageBuffer.byteLength);
    return encoder.combineBuffers(
      nameLengthBuffer,
      nameBuffer,
      messageLengthBuffer,
      messageBuffer,
    );
  }
  decode(decoder: Decoder) {
    const nameLength = decoder.decodeUint8();
    const name = decoder.decodeString(nameLength);
    const messageLength = decoder.decodeUint8();
    const message = decoder.decodeString(messageLength);
    const error = new Error(message);
    error.name = name;
    error.stack = error.stack?.split("\n")[0];
    return error;
  }
}
