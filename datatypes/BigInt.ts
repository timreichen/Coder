import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export const BigIntDataType = {
  test(data: any) { return typeof data === "bigint" },
  encode(encoder: Encoder, data: BigInt) {
    const dataString = String(data)
    const dataBuffer = encoder.stringToBuffer(dataString)
    const lengthBuffer = encoder.uInt32ToBuffer(dataBuffer.byteLength)
    return encoder.combineBuffers(lengthBuffer, dataBuffer)
  },
  decode(decoder: Decoder) {
    const length = Number(decoder.stepUint32())
    const data = decoder.stepString(length)
    return BigInt(data)
  }
}