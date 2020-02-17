import { DataType, MultiDataType } from "./DataType.ts"

export class Decoder {
  buffer: ArrayBuffer
  index: number
  length: number

  private dataTypes: Map<number|number[], DataType | MultiDataType>

  constructor() {
    this.index = 0
    this.length = 0
    this.dataTypes = new Map()
  }

  register(dataType: DataType | MultiDataType) {
    if (dataType instanceof MultiDataType) {
      dataType.id.forEach(id => this.dataTypes.set(id, dataType))
    } else {
      this.dataTypes.set(dataType.id, dataType)
    }
  }

  decode(buffer, index = 0): any {   
    this.buffer = buffer
    this.index = index
    const arrayBuffer = new Uint8Array(buffer)
    this.length = arrayBuffer.length
    const id = this.peekUint8()
    const dataType = this.dataTypes.get(id)
    if (!dataType) { throw Error(`dataType '${id}' at index '${index}' not supported`) }
    return dataType.decode(this)
  }

  static bufferToInt8(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getInt8(offset)
  }
  static bufferToInt16(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getInt16(offset)
  }
  
  static bufferToInt32(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getInt32(offset)
  }
  static bufferToInt64(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getBigInt64(offset)
  }

  static bufferToUint8(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getUint8(offset)
  }
  static bufferToUint16(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getUint16(offset)
  }
  static bufferToUint32(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getUint32(offset)
  }
  static bufferToUint64(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getBigUint64(offset)
  }

  static bufferToFloat32(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getFloat32(offset)
  }
  static bufferToFloat64(buffer: ArrayBuffer, offset: number) {
    const view = new DataView(buffer)
    return view.getFloat64(offset)
  }

  static bufferToString(buffer: ArrayBuffer, offset: number, length: number) {
    const decoder = new TextDecoder()
    const dataBuffer = buffer.slice(offset, offset + length)
    return decoder.decode(dataBuffer)
    // const charCodes = new Uint8Array(buffer.slice(offset, length))
    // const string = String.fromCharCode(...charCodes)
    // return string
  }

  stepBytes(bytes=1) {
    this.index += bytes
  }

  peekInt8() {
    return Decoder.bufferToInt8(this.buffer, this.index)
  }
  stepInt8() {
    const result = Decoder.bufferToInt8(this.buffer, this.index)
    this.stepBytes(1)
    return result
  }

  peekInt16() {
    return Decoder.bufferToInt16(this.buffer, this.index)
  }
  stepInt16() {
    const result = Decoder.bufferToInt16(this.buffer, this.index)
    this.stepBytes(2)
    return result
  }
  peekInt32() {
    return Decoder.bufferToInt32(this.buffer, this.index)
  }
  stepInt32() {
    const result = Decoder.bufferToInt32(this.buffer, this.index)
    this.stepBytes(4)
    return result
  }

  peekInt64() {
    return Decoder.bufferToInt64(this.buffer, this.index)
  }
  stepInt64() {
    const result = Decoder.bufferToInt64(this.buffer, this.index)
    this.stepBytes(8)
    return result
  }


  peekUint8() {
    return Decoder.bufferToUint8(this.buffer, this.index)
  }
  stepUint8() {
    const result = this.peekUint8()
    this.stepBytes(1)
    return result
  }

  stepUint16() {
    const result = Decoder.bufferToUint16(this.buffer, this.index)
    this.stepBytes(2)
    return result
  }
  stepUint32() {
    const result = Decoder.bufferToUint32(this.buffer, this.index)
    this.stepBytes(4)
    return result
  }
  stepUint64() {
    const result = Decoder.bufferToUint64(this.buffer, this.index)
    this.stepBytes(8)
    return result
  }

  stepFloat32() {
    const result = Decoder.bufferToFloat32(this.buffer, this.index)
    this.stepBytes(4)
    return result
  }
  stepFloat64() {
    const result = Decoder.bufferToFloat64(this.buffer, this.index)
    this.stepBytes(8)
    return result
  }
  stepString(length: number) {
    const result = Decoder.bufferToString(this.buffer, this.index, length)
    this.stepBytes(length)
    return result
  }

  stepBuffer(length: number) {
    const dataView = new DataView(this.buffer, this.index, length)
    this.stepBytes(length)
    return dataView.buffer
  }
}