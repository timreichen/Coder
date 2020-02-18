import { DataType } from "../DataType.ts"
import { UINT_16_MAX_VALUE, UINT_32_MAX_VALUE, UINT_8_MAX_VALUE } from "../checks/numbercheck.ts"

import { isType } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class Set8DataType extends DataType {
  validate(data) {    
    return isType(data, Set) && data.size <= UINT_8_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt8ToBuffer(length))
    for (const value of data.values()) {
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    let length = decoder.stepUint8()
    const set = new Set()
    while (length--) {
      const value = decoder.decode(decoder.buffer, decoder.index)
      set.add(value)
    }
    return set
  }
}

export class Set16DataType extends DataType {
  validate(data) {
    return isType(data, Set) && data.size <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt16ToBuffer(length))
    for (const value of data.values()) {
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint16()
    const set = new Set()
    while (length--) {
      const value = decoder.decode(decoder.buffer, decoder.index)
      set.add(value)
    }
    return set
  }
}

export class Set32DataType extends DataType {
  validate(data) {
    return isType(data, Set) && data.size <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = Encoder.combineBuffers(idBuffer, Encoder.uInt32ToBuffer(length))
    for (const value of data.values()) {
      const valueBuffer = encoder.encode(value)
      buffer = Encoder.combineBuffers(buffer, valueBuffer)
    }
    return buffer
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint32()
    const set = new Set()
    while (length--) {
      const value = decoder.decode(decoder.buffer, decoder.index)
      set.add(value)
    }
    return set
  }
}