import { DataType, appendBuffer } from "../DataType.ts"
import { UINT_16_MAX_VALUE, UINT_32_MAX_VALUE } from "../checks/numbercheck.ts"

import { isType } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class WeakMap16DataType extends DataType {
  validate(data) {
    return isType(data, WeakMap) && data.size <= UINT_16_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = appendBuffer(idBuffer, Encoder.uInt16ToBuffer(length))
    for (const [key, value] of data.entries()) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = appendBuffer(buffer, keyBuffer)
      buffer = appendBuffer(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint16()
    const map = new WeakMap()
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      map.set(key, value)
    }
    return map
  }
}
export class WeakMap32DataType extends DataType {
  validate(data) {
    return isType(data, WeakMap) && data.size <= UINT_32_MAX_VALUE
  }
  encode(encoder: Encoder, data) {
    const length = data.size
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    let buffer = appendBuffer(idBuffer, Encoder.uInt32ToBuffer(length))
    for (const [key, value] of data.entries()) {
      const keyBuffer = encoder.encode(key)
      const valueBuffer = encoder.encode(value)
      buffer = appendBuffer(buffer, keyBuffer)
      buffer = appendBuffer(buffer, valueBuffer)
    }

    return buffer
  }
  decode(decoder: Decoder) {
    let length = decoder.stepUint32()
    const map = new WeakMap()
    while (length--) {
      const key = decoder.decode(decoder.buffer, decoder.index)
      const value = decoder.decode(decoder.buffer, decoder.index)
      map.set(key, value)
    }
    return map
  }
}