import { DataType } from "../data_type.ts";
import { Decoder } from "../decoder.ts";
import { Encoder } from "../encoder.ts";

export class FixedValueDataType<T = unknown> implements DataType {
  #value: T;
  constructor(value: T) {
    this.#value = value;
  }
  test(data: unknown) {
    return data === this.#value;
  }
  encode(_encoder: Encoder, _data: T) {
    return new ArrayBuffer(0);
  }
  decode(_decoder: Decoder) {
    return this.#value;
  }
}
