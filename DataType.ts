import { Decoder } from "./Decoder.ts"
import { Encoder } from "./Encoder.ts"

export function appendBuffer(...buffers: ArrayBuffer[]): ArrayBuffer {
  const length = buffers.reduce((length, buffer) => length += buffer.byteLength, 0)
  const newBuffer = new Uint8Array(length)
  let offset = 0
  for (const buffer of buffers) {
    newBuffer.set(new Uint8Array(buffer), offset)
    offset += buffer.byteLength
  }
  return newBuffer.buffer
}

export class DataType {
  id: number
  constructor(id: number) {
    this.id = id
  }
  validate(data): boolean {
    throw Error(`DataType must implement validate`)
  }
  encode(encoder: Encoder, data): ArrayBuffer {
    throw Error(`DataType must implement encode`)
  }
  decode(decoder: Decoder): any {
    throw Error(`DataType must implement decode`)
  }
}

export class MultiDataType {
  id: number[]
  constructor(id: number[]) {
    this.id = id
  }
  validate(data): boolean {
    throw Error(`DataType must implement validate`)
  }
  encode(encoder: Encoder, data): ArrayBuffer {
    throw Error(`DataType must implement encode`)
  }
  decode(decoder: Decoder): any {
    throw Error(`DataType must implement decode`)
  }
}