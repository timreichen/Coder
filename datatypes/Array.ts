import { DataType, MultiDataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

import { isType } from "../checks/typecheck.ts"
import { UINT_8_MAX_VALUE, UINT_16_MAX_VALUE, UINT_32_MAX_VALUE } from "../checks/numbercheck.ts"

export class FixedArrayDataType extends MultiDataType {
  validate(data: any) {
    return isType(data, Array) &&  data.length < this.id.length
  }
  encode(encoder: Encoder, data: any) {
    const length = data.length
    const id = this.id[length]
    let buffer = Encoder.combineBuffers(Encoder.uInt8ToBuffer(id))
    for (const item of data) {
      const itemBuffer = encoder.encode(item)
      buffer = Encoder.combineBuffers(buffer, itemBuffer)
    }
    return buffer
  }
  decode(decoder: Decoder) {
    const id = decoder.stepUint8()
    let length = this.id.indexOf(id)
    const array = []
    while (length--) {
      const item = decoder.decode(decoder.buffer, decoder.index)
      array.push(item)
    }
    return array
  }
}

export class Array8DataType extends DataType {
  validate(data: any) {
    return isType(data, Array) && data.length <= UINT_8_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = data.length
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt8ToBuffer(length))
    for (const item of data) {
      const itemBuffer = encoder.encode(item)
      buffer = Encoder.combineBuffers(buffer, itemBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint8()
    const array = []
    while (length--) {
      const item = decoder.decode(decoder.buffer, decoder.index)
      
      array.push(item)
    }
    return array
  }
}
export class Array16DataType extends DataType {
  validate(data: any) {
    return isType(data, Array) && data.length <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = data.length
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt16ToBuffer(length))
    for (const item of data) {
      const itemBuffer = encoder.encode(item)
      buffer = Encoder.combineBuffers(buffer, itemBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint16()
    const array = []
    while (length--) {
      const item = decoder.decode(decoder.buffer, decoder.index)
      array.push(item)
    }
    return array
  }
}
export class Array32DataType extends DataType {
  validate(data: any) {
    return isType(data, Array) && data.length <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = data.length
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt32ToBuffer(length))
    for (const item of data) {
      const itemBuffer = encoder.encode(item)
      buffer = Encoder.combineBuffers(buffer, itemBuffer)
    }
    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint32()
    const array = []
    while (length--) {
      const item = decoder.decode(decoder.buffer, decoder.index)
      array.push(item)
    }
    return array
  }
}