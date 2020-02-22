import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

import { isType } from "../checks/typecheck.ts"
import { UINT_8_MAX_VALUE, UINT_16_MAX_VALUE, UINT_32_MAX_VALUE } from "../checks/numbercheck.ts"


export class ArrayBuffer8DataType extends DataType {
  validate(data: any) {
    return isType(data, ArrayBuffer) && data.byteLength <= UINT_8_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = data.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.uInt8ToBuffer(length), data)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint8()
    return decoder.stepBuffer(length)
  }
}

export class ArrayBuffer16DataType extends DataType {
  validate(data: any) {
    return isType(data, ArrayBuffer) && data.byteLength <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = data.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.uInt16ToBuffer(length), data)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint16()
    return decoder.stepBuffer(length)
  }
}

export class ArrayBuffer32DataType extends DataType {
  validate(data: any) {
    return isType(data, ArrayBuffer) && data.byteLength <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = data.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.uInt32ToBuffer(length), data)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint32()
    return decoder.stepBuffer(length)
  }
}