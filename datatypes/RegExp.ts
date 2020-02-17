import { DataType, appendBuffer } from "../DataType.ts"

import { isType } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class RegExpDataType extends DataType {

  validate(data) {
    return isType(data, RegExp)
  }

  encode(encoder: Encoder, data: RegExp) {
    const string = data.source
    const dataBuffer = Encoder.stringToBuffer(string)
    const length = dataBuffer.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return appendBuffer(idBuffer, Encoder.uInt16ToBuffer(length), dataBuffer)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    const length = decoder.stepUint16()
    const string = decoder.stepString(length)
    return new RegExp(string)
  }
}