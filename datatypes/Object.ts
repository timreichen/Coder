import { DataType, MultiDataType } from "../DataType.ts"
import { UINT_16_MAX_VALUE, UINT_32_MAX_VALUE, UINT_8_MAX_VALUE } from "../checks/numbercheck.ts"

import { isType } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class FixedObjectDataType extends MultiDataType {
  validate(data: any) {
    return isType(data, Object) && Object.keys(data).length < this.id.length
  }

  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length
    const id = this.id[length]
    const idBuffer = Encoder.uInt8ToBuffer(id)
    let buffer = Encoder.combineBuffers(idBuffer)
    for (const [key, value] of Object.entries(data)) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    const id = decoder.stepUint8()
    let length = this.id.indexOf(id)
    const object: { [key: string]: any } = {}
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      object[key] = value
    }
    return object
  }
}

export class Object8DataType extends DataType {
  validate(data: any) {
    return isType(data, Object) && Object.keys(data).length <= UINT_8_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt8ToBuffer(length))
    for (const [key, value] of Object.entries(data)) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint8()
    const object: { [key: string]: any } = {}
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      object[key] = value
    }
    return object
  }
}
export class Object16DataType extends DataType {
  validate(data: any) {
    return isType(data, Object) && Object.keys(data).length <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt16ToBuffer(length))
    for (const [key, value] of Object.entries(data)) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint16()
    const object: { [key: string]: any } = {}
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      object[key] = value
    }
    return object
  }
}
export class Object32DataType extends DataType {
  validate(data: any) {
    return isType(data, Object) && Object.keys(data).length <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data: any) {
    const length = Object.keys(data).length
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt32ToBuffer(length))
    for (const [key, value] of Object.entries(data)) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint32()
    const object: { [key: string]: any } = {}
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      object[key] = value
    }
    return object
  }
}