import { DataType } from "../DataType.ts";

export class NaNDataType extends DataType {
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
