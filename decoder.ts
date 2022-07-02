import { ArrayBufferDecoder } from "./array_buffer_decoder.ts";
import { DataType } from "./data_type.ts";

export class Decoder extends ArrayBufferDecoder {
  private dataTypes: Map<number, DataType>;

  constructor(dataTypes = new Map()) {
    super(new ArrayBuffer(0));
    this.dataTypes = dataTypes;
  }

  set(id: number, dataType: DataType) {
    this.dataTypes.set(id, dataType);
  }
  delete(id: number) {
    this.dataTypes.delete(id);
  }

  // deno-lint-ignore no-explicit-any
  decodeNext(): any {
    const id = this.decodeUint8();
    const dataType = this.dataTypes.get(id);
    if (!dataType) {
      throw Error(`dataType is not supported: ${id}`);
    }
    return dataType.decode(this, id);
  }

  decode(buffer: ArrayBuffer) {
    this.buffer = buffer;
    this.index = 0;
    return this.decodeNext();
  }
}
