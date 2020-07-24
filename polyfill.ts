// BigInt polyfill
// polyfills DataView getBigInt64, setBigInt64, getBigUint64, setBigUint64
if (!window["BigInt"]) {
  console.warn(
    `BigInt polyfill only supports integers up to 53 bits (MAX_SAFE_INTEGER ${Number.MAX_SAFE_INTEGER})`,
  );

  class BigInt extends Number {
    asIntN() {
      throw Error(`BigInt polyfill does not support toString`);
    }
    asUintN() {
      throw Error(`BigInt polyfill does not support toString`);
    }
    // toLocaleString() {
    //   throw Error(`BigInt polyfill does not support toLocaleString`)
    // }
    // valueOf() {
    //   throw Error(`BigInt polyfill does not support valueOf`)
    // }
  }

  //@ts-ignore
  window["BigInt"] = function (value: number) {
    return new BigInt(value);
  };

  DataView.prototype.getBigInt64 = function (byteOffset: number) {
    const n2 = this.getUint32(byteOffset).toString(2);
    const n1 = this.getUint32(byteOffset + 4).toString(2);
    const string = `${n2}${n1}`;
    return parseInt(string, 2);
  };
  DataView.prototype.setBigInt64 = function (byteOffset: number, value: any) {
    const string = value.toString(2);
    const b1 = string.substr(32);
    const b2 = string.substr(0, 32);
    const n1 = parseInt(b1, 2);
    const n2 = parseInt(b2, 2);
    this.setUint32(byteOffset, n2);
    this.setUint32(byteOffset + 4, n1);
  };
  DataView.prototype.getBigUint64 = function (byteOffset: number) {
    const n2 = this.getUint32(byteOffset).toString(2);
    const n1 = this.getUint32(byteOffset + 4).toString(2);
    const string = `${n2}${n1}`;
    return parseInt(string, 2);
  };
  DataView.prototype.setBigUint64 = function (byteOffset: number, value: any) {
    const string = value.toString(2);
    const b1 = string.substr(32);
    const b2 = string.substr(0, 32);
    const n1 = parseInt(b1, 2);
    const n2 = parseInt(b2, 2);
    this.setUint32(byteOffset, n2);
    this.setUint32(byteOffset + 4, n1);
  };
}
