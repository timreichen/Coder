import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { isType } from "../checks/typecheck.ts"
import { Decoder } from "Decoder.ts"

export class TrueDataType extends DataType {

  validate(data: any) {
    return data === true
  }
  encode(encoder: Encoder, data: any) {
    return Encoder.uInt8ToBuffer(this.id)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return true
  }
}

export class FalseDataType extends DataType {

  validate(data: any) {
    return data === false
  }
  encode(encoder: Encoder, data: any) {
    return Encoder.uInt8ToBuffer(this.id)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return false
  }
}