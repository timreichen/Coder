import { DataType } from "../data_type.ts";

export class NaNDataType implements DataType {
  test(value: unknown) {
    return Number.isNaN(value);
  }
  encode() {
    return new ArrayBuffer(0);
  }
  decode() {
    return NaN;
  }
}
