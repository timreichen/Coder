import { DataType, MultiDataType } from "./DataType.ts"

export class Encoder {
  private dataTypes: Map<number|number[], DataType | MultiDataType>

  constructor() {
    this.dataTypes = new Map()
  }

  register(dataType: DataType | MultiDataType) {
    const id = dataType.id
    if (this.dataTypes.has(id)) {
      return console.warn(`type for id ${id} is already defined`)
    }
    this.dataTypes.set(id, dataType)
  }

  encode(data: any): ArrayBuffer {
    for (let dataType of this.dataTypes.values()) {    
      if (dataType.validate(data)) {
        return dataType.encode(this, data)
      }
    }
    throw Error(`data ${data} is not supported`)
  }

  static combineBuffers(...buffers: ArrayBuffer[]): ArrayBuffer {
    const length = buffers.reduce((length, buffer) => length += buffer.byteLength, 0)
    const newBuffer = new Uint8Array(length)
    let offset = 0
    for (const buffer of buffers) {
      newBuffer.set(new Uint8Array(buffer), offset)
      offset += buffer.byteLength
    }
    return newBuffer.buffer
  }
  

  static int8ToBuffer(number: number) {
    const buffer = new ArrayBuffer(1)
    const view = new DataView(buffer)
    view.setInt8(0, number)
    return buffer
  }
  static int16ToBuffer(number: number) {
    const buffer = new ArrayBuffer(2)
    const view = new DataView(buffer)
    view.setInt16(0, number)
    return buffer
  }
  static int32ToBuffer(number: number) {
    const buffer = new ArrayBuffer(4)
    const view = new DataView(buffer)
    view.setInt32(0, number)
    return buffer
  }
  static int64ToBuffer(number: number) {
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    view.setBigInt64(0, BigInt(number))
    return buffer
  }

  static uInt8ToBuffer(number: number) {
    const buffer = new ArrayBuffer(1)
    const view = new DataView(buffer)
    view.setUint8(0, number)
    return buffer
  }
  static uInt16ToBuffer(number: number) {
    const buffer = new ArrayBuffer(2)
    const view = new DataView(buffer)
    view.setUint16(0, number)
    return buffer
  }
  static uInt32ToBuffer(number: number) {
    const buffer = new ArrayBuffer(4)
    const view = new DataView(buffer)
    view.setUint32(0, number)
    return buffer
  }
  static uInt64ToBuffer(number: number) {
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    view.setBigUint64(0, BigInt(number))
    return buffer
  }

  static float32ToBuffer(number: number) {
    const buffer = new ArrayBuffer(4)
    const view = new DataView(buffer)
    view.setFloat32(0, number)
    return buffer
  }
  static float64ToBuffer(number: number) {
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    view.setFloat64(0, number)
    return buffer
  }

  static stringToBuffer(data: string) {
    const encoder = new TextEncoder()
    return encoder.encode(data)
  }


}