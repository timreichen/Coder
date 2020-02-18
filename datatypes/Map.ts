import { DataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

import { isType } from "../checks/typecheck.ts"
import {  UINT_16_MAX_VALUE, UINT_32_MAX_VALUE, UINT_8_MAX_VALUE } from "../checks/numbercheck.ts"

export class Map8DataType extends DataType {
  validate(data) {
    return isType(data, Map) && data.size <= UINT_8_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt8ToBuffer(length))
    for (const [key, value] of data.entries()) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint8()
    const map = new Map()
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      map.set(key, value)
    }
    return map
  }
}
export class Map16DataType extends DataType {
  validate(data) {
    return isType(data, Map) && data.size <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt16ToBuffer(length))
    for (const [key, value] of data.entries()) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint16()
    const map = new Map()
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      map.set(key, value)
    }
    return map
  }
}
export class Map32DataType extends DataType {
  validate(data) {
    return isType(data, Map) && data.size <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt32ToBuffer(length))
    for (const [key, value] of data.entries()) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, keyBuffer)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint32()
    const map = new Map()
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      map.set(key, value)
    }
    return map
  }
}