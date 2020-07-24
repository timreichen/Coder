import { DataType } from "./DataType.ts";

import "./polyfill.ts";

const encoder = new TextEncoder();

export class Encoder {
  private dataTypes: Map<number, DataType>;
  constructor(dataTypes = new Map()) {
    this.dataTypes = dataTypes;
  }

  register(id: number, dataType: DataType) {
    this.dataTypes.set(id, dataType);
  }

  encode(data: any): ArrayBuffer {
    for (let [id, dataType] of this.dataTypes.entries()) {
      if (dataType.test(data)) {
        const idBuffer = this.uInt8ToBuffer(id);
        return this.combineBuffers(idBuffer, dataType.encode(this, data, id));
      }
    }
    throw Error(`data ${data} is not supported`);
  }

  combineBuffers(...buffers: ArrayBuffer[]): ArrayBuffer {
    const length = buffers.reduce(
      (length, buffer) => length += buffer.byteLength,
      0,
    );
    const newBuffer = new Uint8Array(length);
    let offset = 0;
    for (const buffer of buffers) {
      newBuffer.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }
    return newBuffer.buffer;
  }
  int8ToBuffer(number: number) {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setInt8(0, number);
    return buffer;
  }
  int16ToBuffer(number: number) {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setInt16(0, number);
    return buffer;
  }
  int32ToBuffer(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, number);
    return buffer;
  }
  int64ToBuffer(number: number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, BigInt(number));
    return buffer;
  }

  uInt8ToBuffer(number: number) {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setUint8(0, number);
    return buffer;
  }
  uInt16ToBuffer(number: number) {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setUint16(0, number);
    return buffer;
  }
  uInt32ToBuffer(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, number);
    return buffer;
  }
  uInt64ToBuffer(number: number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, BigInt(number));
    return buffer;
  }

  float32ToBuffer(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, number);
    return buffer;
  }
  float64ToBuffer(number: number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, number);
    return buffer;
  }

  stringToBuffer(data: string) {
    return Encoder.stringToBuffer(data);
  }

  static stringToBuffer(data: string) {
    return encoder.encode(data);
  }
}
