import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"
import { UINT_8_MAX_VALUE, UINT_16_MAX_VALUE, UINT_32_MAX_VALUE } from "../helpers.ts"

export const ArrayBuffer8DataType = {
  test(data: any) { return data instanceof ArrayBuffer && data.byteLength <= UINT_8_MAX_VALUE },
  encode(encoder: Encoder, data: any) {
    const length = data.byteLength
    return encoder.combineBuffers(encoder.uInt8ToBuffer(length), data)
  },
  decode(decoder: Decoder) {
    const length = decoder.stepUint8()
    return decoder.stepBuffer(length)
  }
}

export const ArrayBuffer16DataType = {
  test(data: any) { return data instanceof ArrayBuffer && data.byteLength <= UINT_16_MAX_VALUE },
  encode(encoder: Encoder, data: any) {
    const length = data.byteLength
    return encoder.combineBuffers(encoder.uInt16ToBuffer(length), data)
  },
  decode(decoder: Decoder) {
    const length = decoder.stepUint16()
    return decoder.stepBuffer(length)
  }
}

export const ArrayBuffer32DataType = {
  test(data: any) { return data instanceof ArrayBuffer && data.byteLength <= UINT_32_MAX_VALUE },
  encode(encoder: Encoder, data: any) {
    const length = data.byteLength
    return encoder.combineBuffers(encoder.uInt32ToBuffer(length), data)
  },
  decode(decoder: Decoder) {
    const length = decoder.stepUint32()
    return decoder.stepBuffer(length)
  }
}

// export const ArrayBuffer64DataType = {
//   test(data: any) { return data instanceof ArrayBuffer && data.byteLength <= UINT_64_MAX_VALUE },
//   encode(encoder: Encoder, data: any) {
//     const length = data.byteLength
//     return encoder.combineBuffers(encoder.uInt64ToBuffer(length), data)
//   },
//   decode(decoder: Decoder) {
//     const length = decoder.stepUint64()
//     return decoder.stepBuffer(length)
//   }
// }
