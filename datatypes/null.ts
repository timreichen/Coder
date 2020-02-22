import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class NullDataType extends DataType {

  validate(data: any) {
    return data === null
  }

  encode(encoder: Encoder, data: any) {
    return Encoder.uInt8ToBuffer(this.id)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return null
  }
}