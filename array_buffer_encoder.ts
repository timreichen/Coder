const encoder = new TextEncoder();
export class ArrayBufferEncoder {
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
  encodeInt8(number: number) {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setInt8(0, number);
    return buffer;
  }
  encodeInt16(number: number) {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setInt16(0, number);
    return buffer;
  }
  encodeInt32(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, number);
    return buffer;
  }
  encodeBigInt64(number: number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, BigInt(number));
    return buffer;
  }

  encodeUint8(number: number) {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setUint8(0, number);
    return buffer;
  }
  encodeUint16(number: number) {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setUint16(0, number);
    return buffer;
  }
  encodeUint32(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, number);
    return buffer;
  }
  encodeBigUint64(number: number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, BigInt(number));
    return buffer;
  }

  encodeFloat32(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, number);
    return buffer;
  }
  encodeFloat64(number: number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, number);
    return buffer;
  }

  encodeString(data: string) {
    return encoder.encode(data);
  }
}
