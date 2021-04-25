import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import { DataType } from "../DataType.ts";

export class ErrorDataType extends DataType {
  test(data: unknown) {
    return data instanceof Error;
  }
  encode(encoder: Encoder, data: Error) {
    const nameBuffer = encoder.stringToBuffer(data.name);
    const nameLengthBuffer = encoder.uInt8ToBuffer(nameBuffer.byteLength);
    const messageBuffer = encoder.stringToBuffer(data.message);
    const messageLengthBuffer = encoder.uInt8ToBuffer(messageBuffer.byteLength);
    return encoder.combineBuffers(
      nameLengthBuffer,
      nameBuffer,
      messageLengthBuffer,
      messageBuffer,
    );
  }
  decode(decoder: Decoder) {
    const nameLength = decoder.stepUint8();
    const name = decoder.stepString(nameLength);
    const messageLength = decoder.stepUint8();
    const message = decoder.stepString(messageLength);
    const error = new Error(message);
    error.name = name;
    error.stack = error.stack?.split("\n")[0];
    return error;
  }
}
