import { Encoder } from "./Encoder.ts"
import { Decoder } from "./Decoder.ts"
import { DataType, MultiDataType } from "./DataType.ts"


export class Coder {
  private encoder: Encoder
  private decoder: Decoder
  constructor(encoder: Encoder=new Encoder(), decoder: Decoder=new Decoder()) {
    this.encoder = encoder
    this.decoder = decoder
  }
  register(...dataTypes: (DataType|MultiDataType)[]) {
    dataTypes.forEach(dataType => {
      this.encoder.register(dataType)
      this. decoder.register(dataType)
    })
  }

  encode(data) {
    return this.encoder.encode(data)
  }
  decode(data) {
    return this.decoder.decode(data)
  }
}