const decoder = new TextDecoder();
export class ArrayBufferDecoder {
  index: number;
  #dataView: DataView;
  constructor(buffer: ArrayBuffer) {
    this.index = 0;
    this.#dataView = new DataView(buffer);
  }

  set buffer(buffer: ArrayBuffer) {
    this.#dataView = new DataView(buffer);
  }
  get buffer() {
    return this.#dataView.buffer;
  }

  protected getInt8() {
    return this.#dataView.getInt8(this.index);
  }
  protected getInt16() {
    return this.#dataView.getInt16(this.index);
  }

  protected getInt32() {
    return this.#dataView.getInt32(this.index);
  }
  protected getBigInt64() {
    return this.#dataView.getBigInt64(this.index);
  }

  protected getUint8() {
    return this.#dataView.getUint8(this.index);
  }
  protected getUint16() {
    return this.#dataView.getUint16(this.index);
  }
  protected getUint32() {
    return this.#dataView.getUint32(this.index);
  }
  protected getBigUint64() {
    return this.#dataView.getBigUint64(this.index);
  }

  protected getFloat32() {
    return this.#dataView.getFloat32(this.index);
  }
  protected getFloat64() {
    return this.#dataView.getFloat64(this.index);
  }

  protected getBuffer(length: number) {
    const buffer = this.#dataView.buffer.slice(
      this.index,
      this.index + length,
    );
    return buffer;
  }
  protected getString(length: number) {
    const dataBuffer = this.#dataView.buffer.slice(
      this.index,
      this.index + length,
    );
    return decoder.decode(dataBuffer);
  }

  decodeInt8() {
    const result = this.getInt8();
    this.index += 1;
    return result;
  }

  decodeInt16() {
    const result = this.getInt16();
    this.index += 2;
    return result;
  }

  decodeInt32() {
    const result = this.getInt32();
    this.index += 4;
    return result;
  }
  decodeBigInt64() {
    const result = this.getBigInt64();
    this.index += 8;
    return result;
  }

  decodeUint8() {
    const result = this.getUint8();
    this.index += 1;
    return result;
  }

  decodeUint16() {
    const result = this.getUint16();
    this.index += 2;
    return result;
  }
  decodeUint32() {
    const result = this.getUint32();
    this.index += 4;
    return result;
  }

  decodeBigUint64() {
    const result = this.getBigUint64();
    this.index += 8;
    return result;
  }

  decodeFloat32() {
    const result = this.getFloat32();
    this.index += 4;
    return result;
  }
  decodeFloat64() {
    const result = this.getFloat64();
    this.index += 8;
    return result;
  }
  decodeString(length: number) {
    const result = this.getString(length);
    this.index += length;
    return result;
  }

  decodeBuffer(length: number) {
    const buffer = this.getBuffer(length);
    this.index += length;
    return buffer;
  }
}
