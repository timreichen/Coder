import { ArrayBufferEncoder } from "./array_buffer_encoder.ts";
import { DataType } from "./data_type.ts";

export class Encoder extends ArrayBufferEncoder {
  private dataTypes: Map<number, DataType>;
  constructor(dataTypes = new Map()) {
    super();
    this.dataTypes = dataTypes;
  }

  set(id: number, dataType: DataType) {
    this.dataTypes.set(id, dataType);
  }
  delete(id: number) {
    this.dataTypes.delete(id);
  }

  encode(data: unknown): ArrayBuffer {
    for (const [id, dataType] of this.dataTypes.entries()) {
      if (dataType.test(data)) {
        const idBuffer = this.encodeUint8(id);
        return this.combineBuffers(idBuffer, dataType.encode(this, data, id));
      }
    }
    throw Error(`data ${data} is not supported`);
  }
}
