import { DataType, appendBuffer, MultiDataType } from "../DataType.ts"
import { range, UINT_8_MIN_VALUE, UINT_8_MAX_VALUE, UINT_16_MIN_VALUE, UINT_16_MAX_VALUE, UINT_32_MIN_VALUE, UINT_32_MAX_VALUE, UINT_64_MIN_VALUE, UINT_64_MAX_VALUE } from "../checks/numbercheck.ts"


import { isInteger } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"


export class FixedUintDataType extends MultiDataType {
  validate(data) {
    return  isInteger(data) && this.id.includes(data)
  }
  encode(encoder: Encoder, data) {
    return Encoder.uInt8ToBuffer(data)
  }
  decode(decoder: Decoder) {
    return decoder.stepUint8()
  }
}


export class Uint8DataType extends DataType {

  validate(data) {
    return isInteger(data) && range(data, UINT_8_MIN_VALUE, UINT_8_MAX_VALUE)
  }

  encode(encoder: Encoder, data) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return appendBuffer(idBuffer, Encoder.uInt8ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepUint8()
  }
}
export class Uint16DataType extends DataType {

  validate(data) {
    return isInteger(data) && range(data, UINT_16_MIN_VALUE, UINT_16_MAX_VALUE)
  }

  encode(encoder: Encoder, data) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return appendBuffer(idBuffer, Encoder.uInt16ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepUint16()
  }
}
export class Uint32DataType extends DataType {

  validate(data) {
    return isInteger(data) && range(data, UINT_32_MIN_VALUE, UINT_32_MAX_VALUE)
  }

  encode(encoder: Encoder, data) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return appendBuffer(idBuffer, Encoder.uInt32ToBuffer(data))
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    return decoder.stepUint32()
  }
}

// export class Uint64DataType extends DataType {

//   validate(data) {
//     return isInteger(data) && range(data, UINT_64_MIN_VALUE, UINT_64_MAX_VALUE)
//   }

//   encode(encoder: Encoder, data) {
//     console.log(data, Encoder.uInt64ToBuffer(data));
    
//     const idBuffer = Encoder.uInt8ToBuffer(this.id)
//     return appendBuffer(idBuffer, Encoder.uInt64ToBuffer(data))
//   }
//   decode(decoder: Decoder) {
//     decoder.stepBytes(1)
//     return decoder.stepUint64()
//   }
// }
