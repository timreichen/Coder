import { Encoder } from "../Encoder.ts";
import { Decoder } from "../Decoder.ts";
import { DataType } from "../data_type.ts";

enum Type {
  NaN = 0,
  Number = 1,
}

export class DateDataType implements DataType {
  test(data: unknown) {
    return data instanceof Date;
  }
  encode(encoder: Encoder, data: Date) {
    const time = data.getTime();
    if (isNaN(time)) {
      return encoder.encodeUint8(Type.NaN);
    }
    return encoder.combineBuffers(
      encoder.encodeUint8(Type.Number),
      encoder.encodeBigUint64(time),
    );
  }
  decode(decoder: Decoder) {
    const type = decoder.decodeUint8();
    switch (type) {
      case Type.Number: {
        const time = decoder.decodeBigUint64();
        return new Date(Number(time));
      }
      case Type.NaN: {
        return new Date(NaN);
      }
    }
  }
}
