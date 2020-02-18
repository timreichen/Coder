import { DataType, MultiDataType } from "../DataType.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

import { isInteger } from "../checks/typecheck.ts"
import { range, INT_8_MIN_VALUE, INT_8_MAX_VALUE, INT_16_MIN_VALUE, INT_16_MAX_VALUE, INT_32_MIN_VALUE, INT_32_MAX_VALUE, INT_64_MIN_VALUE, INT_64_MAX_VALUE } from "../checks/numbercheck.ts"

export class FixedIntDataType extends MultiDataType {
  validate(data) {
    return  isInteger(data) && range(data, -1, -32)
  }
  encode(encoder: Encoder, data) {
    const index = (-data)-1
    return Encoder.combineBuffers(Encoder.int8ToBuffer(this.id[index]))
  }
  decode(decoder: Decoder) {
    const id = decoder.stepUint8()
    const index = this.id.indexOf(id)
    return -(index+1)
  }
}

export class Int8DataType extends DataType {

  validate(data) {
    return isInteger(data) && range(data, INT_8_MIN_VALUE, INT_8_MAX_VALUE)
  }

  encode(encoder: Encoder, data) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.int8ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepInt8()
  }
}
export class Int16DataType extends DataType {

  validate(data) {
    return isInteger(data) && range(data, INT_16_MIN_VALUE, INT_16_MAX_VALUE)
  }

  encode(encoder: Encoder, data) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.int16ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepInt16()
  }
}
export class Int32DataType extends DataType {

  validate(data) {
    return isInteger(data) && range(data, INT_32_MIN_VALUE, INT_32_MAX_VALUE)
  }

  encode(encoder: Encoder, data) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return Encoder.combineBuffers(idBuffer, Encoder.int32ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepInt32()
  }
}

// export class Int64DataType extends DataType {
//   validate(data) {
//     return isInteger(data) && range(data, INT_64_MIN_VALUE, INT_64_MAX_VALUE)
//   }

//   encode(encoder: Encoder, data) {
//     const idBuffer = Encoder.uInt8ToBuffer(this.id)
//     return appendBuffer(idBuffer, Encoder.int64ToBuffer(data))
//   }
//   decode(decoder: Decoder) {
//     decoder.stepBytes(1)
//     return decoder.stepInt64()
//   }
// }