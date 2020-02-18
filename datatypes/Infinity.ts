import { DataType, MultiDataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class InfinitydDataType extends MultiDataType {
  validate(data) {
    return data === Infinity || data === -Infinity
  }
  encode(encoder: Encoder, data) {
    let id
    switch (data) {
      case Infinity:
        id = this.id[0]
        break
      case -Infinity:
        id = this.id[1]
        break
      }
      return Encoder.uInt8ToBuffer(id)
  }
  decode(decoder: Decoder) {
    const id = decoder.stepUint8()
    switch (id) {
      case this.id[0]:
        return Infinity
      case this.id[1]:
        return -Infinity
      }
  }
}