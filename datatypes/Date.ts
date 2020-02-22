import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

import { isType } from "../checks/typecheck.ts"


export class DateDataType extends DataType {

  validate(data: any) {
    return isType(data, Date)
  }

  encode(encoder: Encoder, data: any) {
    const time = data.getTime()
    const dataBuffer = Encoder.uInt64ToBuffer(time)
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, dataBuffer)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    const time = Number(decoder.stepUint64())
    return new Date(time)
  }
}