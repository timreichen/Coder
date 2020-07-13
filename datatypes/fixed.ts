import { Encoder } from "../Encoder.ts"
import { Decoder } from "../Decoder.ts"

export const fixedValueDataType = (value: any) => ({
  test(data: any) { return data === value },
  encode(encoder: Encoder, data: any) { return new ArrayBuffer(0) },
  decode(decoder: Decoder) { return value }
})