export const INT_8_MIN_VALUE = -128
export const INT_8_MAX_VALUE = 127
export const INT_16_MIN_VALUE = -32768
export const INT_16_MAX_VALUE = 32767
export const INT_32_MIN_VALUE = -2147483648
export const INT_32_MAX_VALUE = 2147483647
export const INT_64_MIN_VALUE = -9223372036854775808
export const INT_64_MAX_VALUE = 9223372036854775807

export const UINT_8_MIN_VALUE = 0
export const UINT_8_MAX_VALUE = 255
export const UINT_16_MIN_VALUE = 0
export const UINT_16_MAX_VALUE = 65535
export const UINT_32_MIN_VALUE = 0
export const UINT_32_MAX_VALUE = 4294967295
export const UINT_64_MIN_VALUE = 0
export const UINT_64_MAX_VALUE = 18446744073709551615

export const NINT_8_MIN_VALUE = -1
export const NINT_8_MAX_VALUE = -256
export const NINT_16_MIN_VALUE = -1
export const NINT_16_MAX_VALUE = -65536
export const NINT_32_MIN_VALUE = -1
export const NINT_32_MAX_VALUE = -4294967296
export const NINT_64_MIN_VALUE = -1
export const NINT_64_MAX_VALUE = -18446744073709551616

export function range(value: number, min: number, max: number) {
  if (min > max) { [min, max] = [max, min] }
  return value >= min && value <= max
}
