import { DataType, appendBuffer, MultiDataType } from "../DataType.ts"
import { UINT_8_MAX_VALUE, UINT_16_MAX_VALUE, UINT_64_MAX_VALUE, UINT_32_MAX_VALUE } from "../checks/numbercheck.ts"
import { isType } from "../checks/typecheck.ts"
import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export class BigIntDataType extends DataType {
  validate(data) {
    return isType(data, BigInt)
  }
  encode(encoder: Encoder, data) {
    const dataString = String(data)
    const dataBuffer = Encoder.stringToBuffer(dataString)
    const length = dataBuffer.byteLength
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    return appendBuffer(idBuffer, Encoder.uInt32ToBuffer(length), dataBuffer)
  }
  decode(decoder: Decoder) {
    decoder.stepBytes(1)
    const length = Number(decoder.stepUint32())
    return BigInt(decoder.stepString(length))
  }
}