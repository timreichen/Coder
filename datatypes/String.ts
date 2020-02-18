import { DataType, MultiDataType } from "../DataType.ts"
import { UINT_8_MAX_VALUE, UINT_16_MAX_VALUE, UINT_64_MAX_VALUE, UINT_32_MAX_VALUE } from "../checks/numbercheck.ts"
import { isType } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class FixedStringDataType extends MultiDataType {
  validate(data) {
    return isType(data, String) && data.length < this.id.length
  }
  encode(encoder: Encoder, data) {
    const dataBuffer = Encoder.stringToBuffer(data)
    const length = dataBuffer.byteLength
    const id = this.id[length]
    const idBuffer = Encoder.uInt8ToBuffer(id)
    return Encoder.combineBuffers(idBuffer, dataBuffer)
  }
  decode(decoder: Decoder) {
    const id = decoder.stepUint8()
    const length = this.id.indexOf(id)
    return decoder.stepString(length)
  }
}

export class String8DataType extends DataType {
  validate(data) {
    if (!isType(data, String)) { return false }
    const textEncoder = new TextEncoder()
    const byteLength = textEncoder.encode(data).byteLength
    return byteLength <= UINT_8_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const dataBuffer = Encoder.stringToBuffer(data)
    const byteLength = dataBuffer.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.uInt8ToBuffer(byteLength), dataBuffer)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint8()
    return decoder.stepString(length)
  }
}
export class String16DataType extends DataType {

  validate(data) {
    if (!isType(data, String)) { return false }
    const textEncoder = new TextEncoder()
    const byteLength = textEncoder.encode(data).byteLength
    return byteLength <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const dataBuffer = Encoder.stringToBuffer(data)
    const byteLength = dataBuffer.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.uInt16ToBuffer(byteLength), dataBuffer)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint16()
    return decoder.stepString(length)
  }
}
export class String32DataType extends DataType {
  validate(data) {
    return isType(data, String) && data.length <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const dataBuffer = Encoder.stringToBuffer(data)
    const byteLength = dataBuffer.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.uInt32ToBuffer(byteLength), dataBuffer)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint32()
    return decoder.stepString(length)
  }
}