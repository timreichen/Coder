// import { Decoder } from "./Decoder.ts"
// import { Encoder } from "./Encoder.ts"

export class DataType {
  id: number
  constructor(id: number) {
    this.id = id
  }
  validate(data): boolean {
    throw Error(`DataType must implement validate`)
  }
  encode(encoder, data): ArrayBuffer {
    throw Error(`DataType must implement encode`)
  }
  decode(decoder): any {
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
  encode(encoder, data): ArrayBuffer {
    throw Error(`DataType must implement encode`)
  }
  decode(decoder): any {
    throw Error(`DataType must implement decode`)
  }
}