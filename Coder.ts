import { Encoder } from "./Encoder.ts"
import { Decoder } from "./Decoder.ts"
import { DataType } from "./DataType.ts"

export class Coder {
  encoder: Encoder
  decoder: Decoder
  constructor(dataTypes: Map<number, DataType>) {
    this.encoder = new Encoder(dataTypes)
    this.decoder = new Decoder(dataTypes)
  }

  register(id: number, dataType: DataType) {
    this.encoder.register(id, dataType)
    this.decoder.register(id, dataType)
  }

  encode(data: any): ArrayBuffer {
    return this.encoder.encode(data)
  }

  decode(buffer: ArrayBuffer): any {
    return this.decoder.decode(buffer)
  }

}