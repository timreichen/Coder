import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class InfinitydDataType extends DataType {
  validate(data) {
    return data === Infinity
  }
  encode(encoder: Encoder, data) {
    return Encoder.uInt8ToBuffer(this.id)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return Infinity
  }
}