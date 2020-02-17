import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { isType } from "../checks/typecheck.ts"

export class TrueDataType extends DataType {

  validate(data) {
    return data === true
  }
  encode(encoder: Encoder, data) {
    return Encoder.uInt8ToBuffer(this.id)
  }
  decode(decoder) {
    decoder.stepBytes(1)
    return true
  }
}

export class FalseDataType extends DataType {

  validate(data) {
    return data === false
  }
  encode(encoder: Encoder, data) {
    return Encoder.uInt8ToBuffer(this.id)
  }
  decode(decoder) {
    decoder.stepBytes(1)
    return false
  }
}