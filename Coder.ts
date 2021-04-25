import { Encoder } from "./Encoder.ts";
import { Decoder } from "./Decoder.ts";
import { DataType } from "./DataType.ts";

export class Coder {
  private encoder: Encoder;
  private decoder: Decoder;
  constructor(dataTypes: Map<number, DataType>) {
    this.encoder = new Encoder(dataTypes);
    this.decoder = new Decoder(dataTypes);
  }

  set(id: number, dataType: DataType) {
    this.encoder.set(id, dataType);
    this.decoder.set(id, dataType);
  }

  delete(id: number, dataType: DataType) {
    this.encoder.set(id, dataType);
    this.decoder.set(id, dataType);
  }

  encode(data: unknown): ArrayBuffer {
    return this.encoder.encode(data);
  }

  // deno-lint-ignore no-explicit-any
  decode(buffer: ArrayBuffer): any {
    return this.decoder.decode(buffer);
  }
}
