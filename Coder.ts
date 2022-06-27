import { Encoder } from "./Encoder.ts";
import { Decoder } from "./Decoder.ts";
import { DataType } from "./data_type.ts";
import {
  Array16DataType,
  Array32DataType,
  Array8DataType,
  FixedArrayDataType,
} from "./data_types/array.ts";
import { BigIntDataType } from "./data_types/big_int.ts";
import { ErrorDataType } from "./data_types/error.ts";
import { FixedValueDataType } from "./data_types/fixed.ts";
import { Float32DataType, Float64DataType } from "./data_types/float.ts";
import {
  Map16DataType,
  Map32DataType,
  Map8DataType,
} from "./data_types/map.ts";
import { NaNDataType } from "./data_types/nan.ts";
import {
  Nint16DataType,
  Nint32DataType,
  Nint8DataType,
} from "./data_types/n_int.ts";
import { RegExpDataType } from "./data_types/reg_exp.ts";
import {
  Uint16DataType,
  Uint32DataType,
  Uint8DataType,
} from "./data_types/u_int.ts";
import {
  ArrayBuffer16DataType,
  ArrayBuffer32DataType,
  ArrayBuffer8DataType,
} from "./data_types/array_buffer.ts";
import { DateDataType } from "./data_types/Date.ts";
import {
  FixedObjectDataType,
  Object16DataType,
  Object32DataType,
  Object8DataType,
} from "./data_types/Object.ts";
import {
  Set16DataType,
  Set32DataType,
  Set8DataType,
} from "./data_types/set.ts";
import {
  FixedStringDataType,
  String16DataType,
  String32DataType,
  String8DataType,
} from "./data_types/string.ts";

const defaultDataTypes = new Map<number, DataType>([
  [0x00, new FixedValueDataType(0)],
  [0x01, new FixedValueDataType(1)],
  [0x02, new FixedValueDataType(2)],
  [0x03, new FixedValueDataType(3)],
  [0x04, new FixedValueDataType(4)],
  [0x05, new FixedValueDataType(5)],
  [0x06, new FixedValueDataType(6)],
  [0x07, new FixedValueDataType(7)],
  [0x08, new FixedValueDataType(8)],
  [0x09, new FixedValueDataType(9)],
  [0x0a, new FixedValueDataType(10)],
  [0x0b, new FixedValueDataType(11)],
  [0x0c, new FixedValueDataType(12)],
  [0x0d, new FixedValueDataType(13)],
  [0x0e, new FixedValueDataType(14)],
  [0x0f, new FixedValueDataType(15)],

  [0x10, new FixedValueDataType(16)],
  [0x11, new FixedValueDataType(17)],
  [0x12, new FixedValueDataType(18)],
  [0x13, new FixedValueDataType(19)],
  [0x14, new FixedValueDataType(20)],
  [0x15, new FixedValueDataType(21)],
  [0x16, new FixedValueDataType(22)],
  [0x17, new FixedValueDataType(23)],
  [0x18, new FixedValueDataType(24)],
  [0x19, new FixedValueDataType(25)],
  [0x1a, new FixedValueDataType(26)],
  [0x1b, new FixedValueDataType(27)],
  [0x1c, new FixedValueDataType(28)],
  [0x1d, new FixedValueDataType(29)],
  [0x1e, new FixedValueDataType(30)],
  [0x1f, new FixedValueDataType(31)],

  [0x20, new FixedValueDataType(32)],
  [0x21, new FixedValueDataType(33)],
  [0x22, new FixedValueDataType(34)],
  [0x23, new FixedValueDataType(35)],
  [0x24, new FixedValueDataType(36)],
  [0x25, new FixedValueDataType(37)],
  [0x26, new FixedValueDataType(38)],
  [0x27, new FixedValueDataType(39)],
  [0x28, new FixedValueDataType(40)],
  [0x29, new FixedValueDataType(41)],
  [0x2a, new FixedValueDataType(42)],
  [0x2b, new FixedValueDataType(43)],
  [0x2c, new Uint8DataType()],
  [0x2d, new Uint16DataType()],
  [0x2e, new Uint32DataType()],
  // [0x2f, RESERVED],

  [0x30, new FixedValueDataType(-1)],
  [0x31, new FixedValueDataType(-2)],
  [0x32, new FixedValueDataType(-3)],
  [0x33, new FixedValueDataType(-4)],
  [0x34, new FixedValueDataType(-5)],
  [0x35, new FixedValueDataType(-6)],
  [0x36, new FixedValueDataType(-7)],
  [0x37, new FixedValueDataType(-8)],
  [0x38, new FixedValueDataType(-9)],
  [0x39, new FixedValueDataType(-10)],
  [0x3a, new FixedValueDataType(-11)],
  [0x3b, new FixedValueDataType(-12)],
  [0x3c, new FixedValueDataType(-13)],
  [0x3d, new FixedValueDataType(-14)],
  [0x3e, new FixedValueDataType(-15)],
  [0x3f, new FixedValueDataType(-16)],

  [0x40, new FixedValueDataType(-17)],
  [0x41, new FixedValueDataType(-18)],
  [0x42, new FixedValueDataType(-19)],
  [0x43, new FixedValueDataType(-20)],
  [0x44, new FixedValueDataType(-21)],
  [0x45, new FixedValueDataType(-22)],
  [0x46, new FixedValueDataType(-23)],
  [0x47, new FixedValueDataType(-24)],
  [0x48, new FixedValueDataType(-25)],
  [0x49, new FixedValueDataType(-26)],
  [0x4a, new FixedValueDataType(-27)],
  [0x4b, new FixedValueDataType(-28)],
  [0x4c, new FixedValueDataType(-29)],
  [0x4d, new FixedValueDataType(-30)],
  [0x4e, new FixedValueDataType(-31)],
  [0x4f, new FixedValueDataType(-32)],

  [0x50, new FixedValueDataType(-33)],
  [0x51, new FixedValueDataType(-34)],
  [0x52, new FixedValueDataType(-35)],
  [0x53, new FixedValueDataType(-36)],
  [0x54, new FixedValueDataType(-37)],
  [0x55, new FixedValueDataType(-38)],
  [0x56, new FixedValueDataType(-39)],
  [0x57, new FixedValueDataType(-40)],
  [0x58, new FixedValueDataType(-41)],
  [0x59, new FixedValueDataType(-42)],
  [0x5a, new FixedValueDataType(-43)],
  [0x5b, new FixedValueDataType(-44)],
  [0x5c, new Nint8DataType()],
  [0x5d, new Nint16DataType()],
  [0x5e, new Nint32DataType()],
  // [0x5f, RESERVED],

  [0x60, new BigIntDataType()],
  // [0x61, RESERVED],
  [0x62, new Float32DataType()],
  [0x63, new Float64DataType()],
  [0x64, new FixedValueDataType(null)],
  [0x65, new FixedValueDataType(undefined)],
  [0x66, new FixedValueDataType(true)],
  [0x67, new FixedValueDataType(false)],
  [0x68, new FixedValueDataType(Infinity)],
  [0x69, new FixedValueDataType(-Infinity)],
  [0x6a, new NaNDataType()],
  [0x6b, new DateDataType()],
  [0x6c, new RegExpDataType()],
  [0x6d, new ErrorDataType()],
  // [0x6e, RESERVED],
  // [0x6f, RESERVED],

  [0x70, new Map8DataType()],
  [0x71, new Map16DataType()],
  [0x72, new Map32DataType()],
  // [0x73, RESERVED],
  [0x74, new Set8DataType()],
  [0x75, new Set16DataType()],
  [0x76, new Set32DataType()],
  // [0x77, RESERVED],
  [0x78, new ArrayBuffer8DataType()],
  [0x79, new ArrayBuffer16DataType()],
  [0x7a, new ArrayBuffer32DataType()],
  // [0x7b, RESERVED],
  // [0x7c, RESERVED],
  // [0x7d, RESERVED],
  // [0x7e, RESERVED],
  // [0x7f, RESERVED],

  [0x80, new FixedStringDataType(0)],
  [0x81, new FixedStringDataType(1)],
  [0x82, new FixedStringDataType(2)],
  [0x83, new FixedStringDataType(3)],
  [0x84, new FixedStringDataType(4)],
  [0x85, new FixedStringDataType(5)],
  [0x86, new FixedStringDataType(6)],
  [0x87, new FixedStringDataType(7)],
  [0x88, new FixedStringDataType(8)],
  [0x89, new FixedStringDataType(9)],
  [0x8a, new FixedStringDataType(10)],
  [0x8b, new FixedStringDataType(11)],
  [0x8c, new FixedStringDataType(12)],
  [0x8d, new FixedStringDataType(13)],
  [0x8e, new FixedStringDataType(14)],
  [0x8f, new FixedStringDataType(15)],

  [0x90, new FixedStringDataType(16)],
  [0x91, new FixedStringDataType(17)],
  [0x92, new FixedStringDataType(18)],
  [0x93, new FixedStringDataType(19)],
  [0x94, new FixedStringDataType(20)],
  [0x95, new FixedStringDataType(21)],
  [0x96, new FixedStringDataType(22)],
  [0x97, new FixedStringDataType(23)],
  [0x98, new FixedStringDataType(24)],
  [0x99, new FixedStringDataType(25)],
  [0x9a, new FixedStringDataType(26)],
  [0x9b, new FixedStringDataType(27)],
  [0x9c, new String8DataType()],
  [0x9d, new String16DataType()],
  [0x9e, new String32DataType()],
  // [0x9f, RESERVED],

  [0xa0, new FixedArrayDataType(0)],
  [0xa1, new FixedArrayDataType(1)],
  [0xa2, new FixedArrayDataType(2)],
  [0xa3, new FixedArrayDataType(3)],
  [0xa4, new FixedArrayDataType(4)],
  [0xa5, new FixedArrayDataType(5)],
  [0xa6, new FixedArrayDataType(6)],
  [0xa7, new FixedArrayDataType(7)],
  [0xa8, new FixedArrayDataType(8)],
  [0xa9, new FixedArrayDataType(9)],
  [0xaa, new FixedArrayDataType(10)],
  [0xab, new FixedArrayDataType(11)],
  [0xac, new Array8DataType()],
  [0xad, new Array16DataType()],
  [0xae, new Array32DataType()],
  // [0xaf, RESERVED],

  [0xb0, new FixedObjectDataType(0)],
  [0xb1, new FixedObjectDataType(1)],
  [0xb2, new FixedObjectDataType(2)],
  [0xb3, new FixedObjectDataType(3)],
  [0xb4, new FixedObjectDataType(4)],
  [0xb5, new FixedObjectDataType(5)],
  [0xb6, new FixedObjectDataType(6)],
  [0xb7, new FixedObjectDataType(7)],
  [0xb8, new FixedObjectDataType(8)],
  [0xb9, new FixedObjectDataType(9)],
  [0xba, new FixedObjectDataType(10)],
  [0xbb, new FixedObjectDataType(11)],
  [0xbc, new Object8DataType()],
  [0xbd, new Object16DataType()],
  [0xbe, new Object32DataType()],
  // [0xbf, RESERVED],

  // [0xc0, RESERVED],
  // [0xc1, RESERVED],
  // [0xc2, RESERVED],
  // [0xc3, RESERVED],
  // [0xc4, RESERVED],
  // [0xc5, RESERVED],
  // [0xc6, RESERVED],
  // [0xc7, RESERVED],
  // [0xc8, RESERVED],
  // [0xc9, RESERVED],
  // [0xca, RESERVED],
  // [0xcb, RESERVED],
  // [0xcc, RESERVED],
  // [0xcd, RESERVED],
  // [0xce, RESERVED],
  // [0xcf, RESERVED],

  // [0xd0, RESERVED],
  // [0xd1, RESERVED],
  // [0xd2, RESERVED],
  // [0xd3, RESERVED],
  // [0xd4, RESERVED],
  // [0xd5, RESERVED],
  // [0xd6, RESERVED],
  // [0xd7, RESERVED],
  // [0xd8, RESERVED],
  // [0xd9, RESERVED],
  // [0xda, RESERVED],
  // [0xdb, RESERVED],
  // [0xdc, RESERVED],
  // [0xdd, RESERVED],
  // [0xde, RESERVED],
  // [0xdf, RESERVED],

  // [0xe0, RESERVED],
  // [0xe1, RESERVED],
  // [0xe2, RESERVED],
  // [0xe3, RESERVED],
  // [0xe4, RESERVED],
  // [0xe5, RESERVED],
  // [0xe6, RESERVED],
  // [0xe7, RESERVED],
  // [0xe8, RESERVED],
  // [0xe9, RESERVED],
  // [0xea, RESERVED],
  // [0xeb, RESERVED],
  // [0xec, RESERVED],
  // [0xed, RESERVED],
  // [0xee, RESERVED],
  // [0xef, RESERVED],

  // [0xf0, CUSTOM],
  // [0xf1, CUSTOM],
  // [0xf2, CUSTOM],
  // [0xf3, CUSTOM],
  // [0xf4, CUSTOM],
  // [0xf5, CUSTOM],
  // [0xf6, CUSTOM],
  // [0xf7, CUSTOM],
  // [0xf8, CUSTOM],
  // [0xf9, CUSTOM],
  // [0xfa, CUSTOM],
  // [0xfb, CUSTOM],
  // [0xfc, CUSTOM],
  // [0xfd, CUSTOM],
  // [0xfe, CUSTOM],
  // [0xff, CUSTOM],
]);

export class Coder {
  private encoder: Encoder;
  private decoder: Decoder;
  constructor(dataTypes: Map<number, DataType> = defaultDataTypes) {
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

  decode(buffer: ArrayBuffer) {
    return this.decoder.decode(buffer);
  }
}
