import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

import { isFloat } from "../checks/typecheck.ts"
import { range } from "../checks/numbercheck.ts"

export class Float32DataType extends DataType {
  validate(data: any) {
    return isFloat(data) && range(data, -3.4E+38, 3.4E+38)
  }
  encode(encoder: Encoder, data: any) {    
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.float32ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepFloat32()
  }
}
export class Float64DataType extends DataType {
  validate(data: any) {
    return isFloat(data) && range(data, -1.7E+308, 1.7E+308)
  }
  encode(encoder: Encoder, data: any) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.float64ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepFloat64()
  }
}
