import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import { DataType } from "../DataType.ts";

enum Type {
  NaN = 0,
  Number = 1,
}

export class DateDataType extends DataType {
  test(data: unknown) {
    return data instanceof Date;
  }
  encode(encoder: Encoder, data: Date) {
    const time = data.getTime();
    if (isNaN(time)) {
      return encoder.uInt8ToBuffer(Type.NaN);
    }
    return encoder.combineBuffers(
      encoder.uInt8ToBuffer(Type.Number),
      encoder.uInt64ToBuffer(time),
    );
  }
  decode(decoder: Decoder) {
    const type = decoder.stepUint8();
    switch (type) {
      case Type.Number: {
        const time = decoder.stepUint64();
        return new Date(Number(time));
      }
      case Type.NaN: {
        return new Date(NaN);
      }
    }
  }
}
