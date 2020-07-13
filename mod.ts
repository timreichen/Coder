import { Coder } from "./Coder.ts"
export { Encoder } from "./Encoder.ts"
export { Decoder } from "./Decoder.ts"
import { DateDataType } from "./DataTypes/Date.ts"
export { DateDataType }

import { fixedStringDataType, string8DataType, string16DataType, string32DataType } from "./DataTypes/string.ts"
import { uInt8DataType, uInt16DataType, uInt32DataType, } from "./DataTypes/number.ts"
import { nInt8DataType, nInt32DataType, nInt16DataType } from "./DataTypes/number.ts"
import { float32DataType, float64DataType } from "./DataTypes/number.ts"

import { fixedValueDataType } from "./DataTypes/fixed.ts"
import { RegExpDataType } from "./DataTypes/RegExp.ts"
import { ErrorDataType } from "./DataTypes/Error.ts"
import { ArrayBuffer8DataType, ArrayBuffer16DataType, ArrayBuffer32DataType } from "./DataTypes/ArrayBuffer.ts"
import { fixedArrayDataType, Array8DataType, Array16DataType, Array32DataType } from "./DataTypes/Array.ts"
import { fixedObjectDataType, Object8DataType, Object16DataType, Object32DataType } from "./DataTypes/Object.ts"
import { Map8DataType, Map16DataType, Map32DataType } from "./DataTypes/Map.ts"
import { Set8DataType, Set16DataType, Set32DataType } from "./DataTypes/Set.ts"
import { BigIntDataType } from "./DataTypes/BigInt.ts"

const RESERVED = {
  test() { return false },
  encode() { return new ArrayBuffer(0) },
  decode() { }
}
const CUSTOM = RESERVED

const map = new Map([
  [0x00, fixedValueDataType(0)], [0x01, fixedValueDataType(1)], [0x02, fixedValueDataType(2)], [0x03, fixedValueDataType(3)],
  [0x04, fixedValueDataType(4)], [0x05, fixedValueDataType(5)], [0x06, fixedValueDataType(6)], [0x07, fixedValueDataType(7)],
  [0x08, fixedValueDataType(8)], [0x09, fixedValueDataType(9)], [0x0a, fixedValueDataType(10)], [0x0b, fixedValueDataType(11)],
  [0x0c, fixedValueDataType(12)], [0x0d, fixedValueDataType(13)], [0x0e, fixedValueDataType(14)], [0x0f, fixedValueDataType(15)],

  [0x10, fixedValueDataType(16)], [0x11, fixedValueDataType(17)], [0x12, fixedValueDataType(18)], [0x13, fixedValueDataType(19)],
  [0x14, fixedValueDataType(20)], [0x15, fixedValueDataType(21)], [0x16, fixedValueDataType(22)], [0x17, fixedValueDataType(23)],
  [0x18, fixedValueDataType(24)], [0x19, fixedValueDataType(25)], [0x1a, fixedValueDataType(26)], [0x1b, fixedValueDataType(27)],
  [0x1c, fixedValueDataType(28)], [0x1d, fixedValueDataType(29)], [0x1e, fixedValueDataType(30)], [0x1f, fixedValueDataType(31)],

  [0x20, fixedValueDataType(32)], [0x21, fixedValueDataType(33)], [0x22, fixedValueDataType(34)], [0x23, fixedValueDataType(35)],
  [0x24, fixedValueDataType(36)], [0x25, fixedValueDataType(37)], [0x26, fixedValueDataType(38)], [0x27, fixedValueDataType(39)],
  [0x28, fixedValueDataType(40)], [0x29, fixedValueDataType(41)], [0x2a, fixedValueDataType(42)], [0x2b, fixedValueDataType(43)],
  [0x2c, uInt8DataType], [0x2d, uInt16DataType], [0x2e, uInt32DataType], [0x2f, RESERVED],

  [0x30, fixedValueDataType(-1)], [0x31, fixedValueDataType(-2)], [0x32, fixedValueDataType(-3)], [0x33, fixedValueDataType(-4)],
  [0x34, fixedValueDataType(-5)], [0x35, fixedValueDataType(-6)], [0x36, fixedValueDataType(-7)], [0x37, fixedValueDataType(-8)],
  [0x38, fixedValueDataType(-9)], [0x39, fixedValueDataType(-10)], [0x3a, fixedValueDataType(-11)], [0x3b, fixedValueDataType(-12)],
  [0x3c, fixedValueDataType(-13)], [0x3d, fixedValueDataType(-14)], [0x3e, fixedValueDataType(-15)], [0x3f, fixedValueDataType(-16)],

  [0x40, fixedValueDataType(-17)], [0x41, fixedValueDataType(-18)], [0x42, fixedValueDataType(-19)], [0x43, fixedValueDataType(-20)],
  [0x44, fixedValueDataType(-21)], [0x45, fixedValueDataType(-22)], [0x46, fixedValueDataType(-23)], [0x47, fixedValueDataType(-24)],
  [0x48, fixedValueDataType(-25)], [0x49, fixedValueDataType(-26)], [0x4a, fixedValueDataType(-27)], [0x4b, fixedValueDataType(-28)],
  [0x4c, fixedValueDataType(-29)], [0x4d, fixedValueDataType(-30)], [0x4e, fixedValueDataType(-31)], [0x4f, fixedValueDataType(-32)],

  [0x50, fixedValueDataType(-33)], [0x51, fixedValueDataType(-34)], [0x52, fixedValueDataType(-35)], [0x53, fixedValueDataType(-36)],
  [0x54, fixedValueDataType(-37)], [0x55, fixedValueDataType(-38)], [0x56, fixedValueDataType(-39)], [0x57, fixedValueDataType(-40)],
  [0x58, fixedValueDataType(-41)], [0x59, fixedValueDataType(-42)], [0x5a, fixedValueDataType(-43)], [0x5b, fixedValueDataType(-44)],
  [0x5c, nInt8DataType], [0x5d, nInt16DataType], [0x5e, nInt32DataType], [0x5f, RESERVED],

  [0x60, BigIntDataType], [0x61, RESERVED], [0x62, float32DataType], [0x63, float64DataType],
  [0x64, fixedValueDataType(null)], [0x65, fixedValueDataType(undefined)], [0x66, fixedValueDataType(true)], [0x67, fixedValueDataType(false)],
  [0x68, RESERVED], [0x69, RESERVED], [0x6a, RESERVED], [0x6b, RESERVED],
  [0x6c, RESERVED], [0x6d, RESERVED], [0x6e, RESERVED], [0x6f, RESERVED],

  [0x70, DateDataType], [0x71, RegExpDataType], [0x72, ErrorDataType], [0x73, RESERVED],
  [0x74, RESERVED], [0x75, RESERVED], [0x76, RESERVED], [0x77, RESERVED],
  [0x78, RESERVED], [0x79, RESERVED], [0x7a, RESERVED], [0x7b, RESERVED],
  [0x7c, ArrayBuffer8DataType], [0x7d, ArrayBuffer16DataType], [0x7e, ArrayBuffer32DataType], [0x7f, RESERVED],

  [0x80, fixedStringDataType(0)], [0x81, fixedStringDataType(1)], [0x82, fixedStringDataType(2)], [0x83, fixedStringDataType(3)],
  [0x84, fixedStringDataType(4)], [0x85, fixedStringDataType(5)], [0x86, fixedStringDataType(6)], [0x87, fixedStringDataType(7)],
  [0x88, fixedStringDataType(8)], [0x89, fixedStringDataType(9)], [0x8a, fixedStringDataType(10)], [0x8b, fixedStringDataType(11)],
  [0x8c, fixedStringDataType(12)], [0x8d, fixedStringDataType(13)], [0x8e, fixedStringDataType(14)], [0x8f, fixedStringDataType(15)],

  [0x90, fixedStringDataType(16)], [0x91, fixedStringDataType(17)], [0x92, fixedStringDataType(18)], [0x93, fixedStringDataType(19)],
  [0x94, fixedStringDataType(20)], [0x95, fixedStringDataType(21)], [0x96, fixedStringDataType(22)], [0x97, fixedStringDataType(23)],
  [0x98, fixedStringDataType(24)], [0x99, fixedStringDataType(25)], [0x9a, fixedStringDataType(26)], [0x9b, fixedStringDataType(27)],
  [0x9c, string8DataType], [0x9d, string16DataType], [0x9e, string32DataType], [0x9f, RESERVED],

  [0xa0, fixedArrayDataType(0)], [0xa1, fixedArrayDataType(1)], [0xa2, fixedArrayDataType(2)], [0xa3, fixedArrayDataType(3)],
  [0xa4, fixedArrayDataType(4)], [0xa5, fixedArrayDataType(5)], [0xa6, fixedArrayDataType(6)], [0xa7, fixedArrayDataType(7)],
  [0xa8, fixedArrayDataType(8)], [0xa9, fixedArrayDataType(9)], [0xaa, fixedArrayDataType(10)], [0xab, fixedArrayDataType(11)],
  [0xac, Array8DataType], [0xad, Array16DataType], [0xae, Array32DataType], [0xaf, RESERVED],


  [0xb0, fixedObjectDataType(0)], [0xb1, fixedObjectDataType(1)], [0xb2, fixedObjectDataType(2)], [0xb3, fixedObjectDataType(3)],
  [0xb4, fixedObjectDataType(4)], [0xb5, fixedObjectDataType(5)], [0xb6, fixedObjectDataType(6)], [0xb7, fixedObjectDataType(7)],
  [0xb8, fixedObjectDataType(8)], [0xb9, fixedObjectDataType(9)], [0xba, fixedObjectDataType(10)], [0xbb, fixedObjectDataType(11)],
  [0xbc, Object8DataType], [0xbd, Object16DataType], [0xbe, Object32DataType], [0xbf, RESERVED],


  [0xc0, Map8DataType], [0xc1, Map16DataType], [0xc2, Map32DataType], [0xc3, RESERVED],
  [0xc4, Set8DataType], [0xc5, Set16DataType], [0xc6, Set32DataType], [0xc7, RESERVED],
  [0xc8, RESERVED], [0xc9, RESERVED], [0xca, RESERVED], [0xcb, RESERVED],
  [0xcc, RESERVED], [0xcd, RESERVED], [0xce, RESERVED], [0xcf, RESERVED],

  [0xd0, RESERVED], [0xd1, RESERVED], [0xd2, RESERVED], [0xd3, RESERVED],
  [0xd4, RESERVED], [0xd5, RESERVED], [0xd6, RESERVED], [0xd7, RESERVED],
  [0xd8, RESERVED], [0xd9, RESERVED], [0xda, RESERVED], [0xdb, RESERVED],
  [0xdc, RESERVED], [0xdd, RESERVED], [0xde, RESERVED], [0xdf, RESERVED],

  [0xe0, RESERVED], [0xe1, RESERVED], [0xe2, RESERVED], [0xe3, RESERVED],
  [0xe4, RESERVED], [0xe5, RESERVED], [0xe6, RESERVED], [0xe7, RESERVED],
  [0xe8, RESERVED], [0xe9, RESERVED], [0xea, RESERVED], [0xeb, RESERVED],
  [0xec, RESERVED], [0xed, RESERVED], [0xee, RESERVED], [0xef, RESERVED],

  [0xf0, CUSTOM], [0xf1, CUSTOM], [0xf2, CUSTOM], [0xf3, CUSTOM],
  [0xf4, CUSTOM], [0xf5, CUSTOM], [0xf6, CUSTOM], [0xf7, CUSTOM],
  [0xf8, CUSTOM], [0xf9, CUSTOM], [0xfa, CUSTOM], [0xfb, CUSTOM],
  [0xfc, CUSTOM], [0xfd, CUSTOM], [0xfe, CUSTOM], [0xff, CUSTOM],

])

export const coder = new Coder(map)