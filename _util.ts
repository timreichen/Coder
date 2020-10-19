const _2Pow8 = Math.pow(2, 8);
const _2Pow16 = Math.pow(_2Pow8, 2);
const _2Pow32 = Math.pow(_2Pow16, 2);
const _2Pow64 = Math.pow(_2Pow32, 2);

export const INT_8_MIN_VALUE = -_2Pow8 / 2;
export const INT_8_MAX_VALUE = _2Pow8 / 2 - 1;
export const INT_16_MIN_VALUE = -_2Pow16 / 2;
export const INT_16_MAX_VALUE = _2Pow16 / 2 - 1;
export const INT_32_MIN_VALUE = -_2Pow32 / 2;
export const INT_32_MAX_VALUE = _2Pow32 / 2 - 1;
export const INT_64_MIN_VALUE = -_2Pow64 / 2;
export const INT_64_MAX_VALUE = _2Pow64 / 2 - 1;

export const UINT_8_MIN_VALUE = 0;
export const UINT_8_MAX_VALUE = _2Pow8 - 1;
export const UINT_16_MIN_VALUE = 0;
export const UINT_16_MAX_VALUE = _2Pow16 - 1;
export const UINT_32_MIN_VALUE = 0;
export const UINT_32_MAX_VALUE = _2Pow32 - 1;
export const UINT_64_MIN_VALUE = 0;
export const UINT_64_MAX_VALUE = _2Pow64 - 1;

export const NINT_8_MIN_VALUE = -1;
export const NINT_8_MAX_VALUE = -_2Pow8;
export const NINT_16_MIN_VALUE = -1;
export const NINT_16_MAX_VALUE = -_2Pow16;
export const NINT_32_MIN_VALUE = -1;
export const NINT_32_MAX_VALUE = -_2Pow32;
export const NINT_64_MIN_VALUE = -1;
export const NINT_64_MAX_VALUE = -_2Pow64;

export function range(value: number, min: number, max: number) {
  if (min > max) [min, max] = [max, min];
  return value >= min && value <= max;
}
