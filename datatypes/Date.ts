import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export const DateDataType = {
  test(data: any) { return data instanceof Date },
  encode(encoder: Encoder, data: Date) {
    const time = data.getTime()
    return encoder.uInt64ToBuffer(time)
  },
  decode(decoder: Decoder) {
    const time = decoder.stepUint64()
    return new Date(Number(time))
  }
}
