// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("Decoder", [], function (exports_1, context_1) {
  "use strict";
  var decoder, Decoder;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {
      decoder = new TextDecoder();
      Decoder = class Decoder {
        constructor(dataTypes = new Map()) {
          this.dataTypes = dataTypes;
          this.index = 0;
          this.length = 0;
          this.buffer = new ArrayBuffer(this.length);
        }
        register(id, dataType) {
          this.dataTypes.set(id, dataType);
        }
        decode(buffer, index = 0) {
          this.buffer = buffer;
          this.index = index;
          const arrayBuffer = new Uint8Array(buffer);
          this.length = arrayBuffer.length;
          const id = this.stepUint8();
          const dataType = this.dataTypes.get(id);
          if (!dataType) {
            throw Error(
              `dataType '${id}' at index '${index}' is not supported`,
            );
          }
          return dataType.decode(this, id);
        }
        static bufferToInt8(buffer, offset) {
          const view = new DataView(buffer);
          return view.getInt8(offset);
        }
        static bufferToInt16(buffer, offset) {
          const view = new DataView(buffer);
          return view.getInt16(offset);
        }
        static bufferToInt32(buffer, offset) {
          const view = new DataView(buffer);
          return view.getInt32(offset);
        }
        static bufferToUint8(buffer, offset) {
          const view = new DataView(buffer);
          return view.getUint8(offset);
        }
        static bufferToUint16(buffer, offset) {
          const view = new DataView(buffer);
          return view.getUint16(offset);
        }
        static bufferToUint32(buffer, offset) {
          const view = new DataView(buffer);
          return view.getUint32(offset);
        }
        static bufferToUint64(buffer, offset) {
          const view = new DataView(buffer);
          return view.getBigUint64(offset);
        }
        static bufferToFloat32(buffer, offset) {
          const view = new DataView(buffer);
          return view.getFloat32(offset);
        }
        static bufferToFloat64(buffer, offset) {
          const view = new DataView(buffer);
          return view.getFloat64(offset);
        }
        static bufferToString(buffer, offset, length) {
          const dataBuffer = buffer.slice(offset, offset + length);
          return decoder.decode(dataBuffer);
        }
        stepBytes(bytes = 1) {
          this.index += bytes;
        }
        next() {
          return this.decode(this.buffer, this.index);
        }
        peekInt8() {
          return Decoder.bufferToInt8(this.buffer, this.index);
        }
        stepInt8() {
          const result = Decoder.bufferToInt8(this.buffer, this.index);
          this.stepBytes(1);
          return result;
        }
        peekInt16() {
          return Decoder.bufferToInt16(this.buffer, this.index);
        }
        stepInt16() {
          const result = Decoder.bufferToInt16(this.buffer, this.index);
          this.stepBytes(2);
          return result;
        }
        peekInt32() {
          return Decoder.bufferToInt32(this.buffer, this.index);
        }
        stepInt32() {
          const result = Decoder.bufferToInt32(this.buffer, this.index);
          this.stepBytes(4);
          return result;
        }
        peekUint8() {
          return Decoder.bufferToUint8(this.buffer, this.index);
        }
        stepUint8() {
          const result = this.peekUint8();
          this.stepBytes(1);
          return result;
        }
        stepUint16() {
          const result = Decoder.bufferToUint16(this.buffer, this.index);
          this.stepBytes(2);
          return result;
        }
        stepUint32() {
          const result = Decoder.bufferToUint32(this.buffer, this.index);
          this.stepBytes(4);
          return result;
        }
        stepUint64() {
          const result = Decoder.bufferToUint64(this.buffer, this.index);
          this.stepBytes(8);
          return result;
        }
        stepFloat32() {
          const result = Decoder.bufferToFloat32(this.buffer, this.index);
          this.stepBytes(4);
          return result;
        }
        stepFloat64() {
          const result = Decoder.bufferToFloat64(this.buffer, this.index);
          this.stepBytes(8);
          return result;
        }
        stepString(length) {
          const result = Decoder.bufferToString(
            this.buffer,
            this.index,
            length,
          );
          this.stepBytes(length);
          return result;
        }
        stepBuffer(length) {
          const dataView = new DataView(this.buffer, this.index, length);
          this.stepBytes(length);
          return dataView.buffer;
        }
      };
      exports_1("Decoder", Decoder);
    },
  };
});
System.register("DataType", [], function (exports_2, context_2) {
  "use strict";
  var __moduleName = context_2 && context_2.id;
  return {
    setters: [],
    execute: function () {
    },
  };
});
System.register("Encoder", [], function (exports_3, context_3) {
  "use strict";
  var encoder, Encoder;
  var __moduleName = context_3 && context_3.id;
  return {
    setters: [],
    execute: function () {
      encoder = new TextEncoder();
      Encoder = class Encoder {
        constructor(dataTypes = new Map()) {
          this.dataTypes = dataTypes;
        }
        register(id, dataType) {
          this.dataTypes.set(id, dataType);
        }
        encode(data) {
          for (let [id, dataType] of this.dataTypes.entries()) {
            if (dataType.test(data)) {
              const idBuffer = this.uInt8ToBuffer(id);
              return this.combineBuffers(
                idBuffer,
                dataType.encode(this, data, id),
              );
            }
          }
          throw Error(`data ${data} is not supported`);
        }
        combineBuffers(...buffers) {
          const length = buffers.reduce(
            (length, buffer) => length += buffer.byteLength,
            0,
          );
          const newBuffer = new Uint8Array(length);
          let offset = 0;
          for (const buffer of buffers) {
            newBuffer.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
          }
          return newBuffer.buffer;
        }
        int8ToBuffer(number) {
          const buffer = new ArrayBuffer(1);
          const view = new DataView(buffer);
          view.setInt8(0, number);
          return buffer;
        }
        int16ToBuffer(number) {
          const buffer = new ArrayBuffer(2);
          const view = new DataView(buffer);
          view.setInt16(0, number);
          return buffer;
        }
        int32ToBuffer(number) {
          const buffer = new ArrayBuffer(4);
          const view = new DataView(buffer);
          view.setInt32(0, number);
          return buffer;
        }
        int64ToBuffer(number) {
          const buffer = new ArrayBuffer(8);
          const view = new DataView(buffer);
          view.setBigInt64(0, BigInt(number));
          return buffer;
        }
        uInt8ToBuffer(number) {
          const buffer = new ArrayBuffer(1);
          const view = new DataView(buffer);
          view.setUint8(0, number);
          return buffer;
        }
        uInt16ToBuffer(number) {
          const buffer = new ArrayBuffer(2);
          const view = new DataView(buffer);
          view.setUint16(0, number);
          return buffer;
        }
        uInt32ToBuffer(number) {
          const buffer = new ArrayBuffer(4);
          const view = new DataView(buffer);
          view.setUint32(0, number);
          return buffer;
        }
        uInt64ToBuffer(number) {
          const buffer = new ArrayBuffer(8);
          const view = new DataView(buffer);
          view.setBigUint64(0, BigInt(number));
          return buffer;
        }
        float32ToBuffer(number) {
          const buffer = new ArrayBuffer(4);
          const view = new DataView(buffer);
          view.setFloat32(0, number);
          return buffer;
        }
        float64ToBuffer(number) {
          const buffer = new ArrayBuffer(8);
          const view = new DataView(buffer);
          view.setFloat64(0, number);
          return buffer;
        }
        stringToBuffer(data) {
          return Encoder.stringToBuffer(data);
        }
        static stringToBuffer(data) {
          return encoder.encode(data);
        }
      };
      exports_3("Encoder", Encoder);
    },
  };
});
System.register(
  "Coder",
  ["Encoder", "Decoder"],
  function (exports_4, context_4) {
    "use strict";
    var Encoder_ts_1, Decoder_ts_1, Coder;
    var __moduleName = context_4 && context_4.id;
    return {
      setters: [
        function (Encoder_ts_1_1) {
          Encoder_ts_1 = Encoder_ts_1_1;
        },
        function (Decoder_ts_1_1) {
          Decoder_ts_1 = Decoder_ts_1_1;
        },
      ],
      execute: function () {
        Coder = class Coder {
          constructor(dataTypes) {
            this.encoder = new Encoder_ts_1.Encoder(dataTypes);
            this.decoder = new Decoder_ts_1.Decoder(dataTypes);
          }
          register(id, dataType) {
            this.encoder.register(id, dataType);
            this.decoder.register(id, dataType);
          }
          encode(data) {
            return this.encoder.encode(data);
          }
          decode(buffer) {
            return this.decoder.decode(buffer);
          }
        };
        exports_4("Coder", Coder);
      },
    };
  },
);
System.register("datatypes/Date", [], function (exports_5, context_5) {
  "use strict";
  var DateDataType;
  var __moduleName = context_5 && context_5.id;
  return {
    setters: [],
    execute: function () {
      exports_5(
        "DateDataType",
        DateDataType = {
          test(data) {
            return data instanceof Date;
          },
          encode(encoder, data) {
            const time = data.getTime();
            return encoder.uInt64ToBuffer(time);
          },
          decode(decoder) {
            const time = decoder.stepUint64();
            return new Date(Number(time));
          },
        },
      );
    },
  };
});
System.register("helpers", [], function (exports_6, context_6) {
  "use strict";
  var _2Pow8,
    _2Pow16,
    _2Pow32,
    _2Pow64,
    INT_8_MIN_VALUE,
    INT_8_MAX_VALUE,
    INT_16_MIN_VALUE,
    INT_16_MAX_VALUE,
    INT_32_MIN_VALUE,
    INT_32_MAX_VALUE,
    INT_64_MIN_VALUE,
    INT_64_MAX_VALUE,
    UINT_8_MIN_VALUE,
    UINT_8_MAX_VALUE,
    UINT_16_MIN_VALUE,
    UINT_16_MAX_VALUE,
    UINT_32_MIN_VALUE,
    UINT_32_MAX_VALUE,
    UINT_64_MIN_VALUE,
    UINT_64_MAX_VALUE,
    NINT_8_MIN_VALUE,
    NINT_8_MAX_VALUE,
    NINT_16_MIN_VALUE,
    NINT_16_MAX_VALUE,
    NINT_32_MIN_VALUE,
    NINT_32_MAX_VALUE,
    NINT_64_MIN_VALUE,
    NINT_64_MAX_VALUE;
  var __moduleName = context_6 && context_6.id;
  function range(value, min, max) {
    if (min > max) {
      [min, max] = [max, min];
    }
    return value >= min && value <= max;
  }
  exports_6("range", range);
  return {
    setters: [],
    execute: function () {
      _2Pow8 = Math.pow(2, 8);
      _2Pow16 = Math.pow(_2Pow8, 2);
      _2Pow32 = Math.pow(_2Pow16, 2);
      _2Pow64 = Math.pow(_2Pow32, 2);
      exports_6("INT_8_MIN_VALUE", INT_8_MIN_VALUE = -_2Pow8 / 2);
      exports_6("INT_8_MAX_VALUE", INT_8_MAX_VALUE = _2Pow8 / 2 - 1);
      exports_6("INT_16_MIN_VALUE", INT_16_MIN_VALUE = -_2Pow16 / 2);
      exports_6("INT_16_MAX_VALUE", INT_16_MAX_VALUE = _2Pow16 / 2 - 1);
      exports_6("INT_32_MIN_VALUE", INT_32_MIN_VALUE = -_2Pow32 / 2);
      exports_6("INT_32_MAX_VALUE", INT_32_MAX_VALUE = _2Pow32 / 2 - 1);
      exports_6("INT_64_MIN_VALUE", INT_64_MIN_VALUE = -_2Pow64 / 2);
      exports_6("INT_64_MAX_VALUE", INT_64_MAX_VALUE = _2Pow64 / 2 - 1);
      exports_6("UINT_8_MIN_VALUE", UINT_8_MIN_VALUE = 0);
      exports_6("UINT_8_MAX_VALUE", UINT_8_MAX_VALUE = _2Pow8 - 1);
      exports_6("UINT_16_MIN_VALUE", UINT_16_MIN_VALUE = 0);
      exports_6("UINT_16_MAX_VALUE", UINT_16_MAX_VALUE = _2Pow16 - 1);
      exports_6("UINT_32_MIN_VALUE", UINT_32_MIN_VALUE = 0);
      exports_6("UINT_32_MAX_VALUE", UINT_32_MAX_VALUE = _2Pow32 - 1);
      exports_6("UINT_64_MIN_VALUE", UINT_64_MIN_VALUE = 0);
      exports_6("UINT_64_MAX_VALUE", UINT_64_MAX_VALUE = _2Pow64 - 1);
      exports_6("NINT_8_MIN_VALUE", NINT_8_MIN_VALUE = -1);
      exports_6("NINT_8_MAX_VALUE", NINT_8_MAX_VALUE = -_2Pow8);
      exports_6("NINT_16_MIN_VALUE", NINT_16_MIN_VALUE = -1);
      exports_6("NINT_16_MAX_VALUE", NINT_16_MAX_VALUE = -_2Pow16);
      exports_6("NINT_32_MIN_VALUE", NINT_32_MIN_VALUE = -1);
      exports_6("NINT_32_MAX_VALUE", NINT_32_MAX_VALUE = -_2Pow32);
      exports_6("NINT_64_MIN_VALUE", NINT_64_MIN_VALUE = -1);
      exports_6("NINT_64_MAX_VALUE", NINT_64_MAX_VALUE = -_2Pow64);
    },
  };
});
System.register(
  "datatypes/String",
  ["Encoder", "helpers"],
  function (exports_7, context_7) {
    "use strict";
    var Encoder_ts_2,
      helpers_ts_1,
      fixedStringDataType,
      string8DataType,
      string16DataType,
      string32DataType;
    var __moduleName = context_7 && context_7.id;
    return {
      setters: [
        function (Encoder_ts_2_1) {
          Encoder_ts_2 = Encoder_ts_2_1;
        },
        function (helpers_ts_1_1) {
          helpers_ts_1 = helpers_ts_1_1;
        },
      ],
      execute: function () {
        exports_7(
          "fixedStringDataType",
          fixedStringDataType = (length) => ({
            test(data) {
              return typeof data === "string" &&
                Encoder_ts_2.Encoder.stringToBuffer(data).byteLength ===
                  length;
            },
            encode(encoder, data) {
              return encoder.stringToBuffer(data);
            },
            decode(decoder) {
              return decoder.stepString(length);
            },
          }),
        );
        exports_7(
          "string8DataType",
          string8DataType = {
            test(data) {
              return typeof data === "string" &&
                Encoder_ts_2.Encoder.stringToBuffer(data).byteLength <=
                  helpers_ts_1.UINT_8_MAX_VALUE;
            },
            encode(encoder, data) {
              const dataBuffer = encoder.stringToBuffer(data);
              const lengthBuffer = encoder.uInt8ToBuffer(dataBuffer.byteLength);
              return encoder.combineBuffers(lengthBuffer, dataBuffer);
            },
            decode(decoder) {
              const length = decoder.stepUint8();
              return decoder.stepString(length);
            },
          },
        );
        exports_7(
          "string16DataType",
          string16DataType = {
            test(data) {
              return typeof data === "string" &&
                Encoder_ts_2.Encoder.stringToBuffer(data).byteLength <=
                  helpers_ts_1.UINT_16_MAX_VALUE;
            },
            encode(encoder, data) {
              const dataBuffer = encoder.stringToBuffer(data);
              const lengthBuffer = encoder.uInt16ToBuffer(
                dataBuffer.byteLength,
              );
              return encoder.combineBuffers(lengthBuffer, dataBuffer);
            },
            decode(decoder) {
              const length = decoder.stepUint16();
              return decoder.stepString(length);
            },
          },
        );
        exports_7(
          "string32DataType",
          string32DataType = {
            test(data) {
              return typeof data === "string" &&
                Encoder_ts_2.Encoder.stringToBuffer(data).byteLength <=
                  helpers_ts_1.UINT_32_MAX_VALUE;
            },
            encode(encoder, data) {
              const dataBuffer = encoder.stringToBuffer(data);
              const lengthBuffer = encoder.uInt32ToBuffer(
                dataBuffer.byteLength,
              );
              return encoder.combineBuffers(lengthBuffer, dataBuffer);
            },
            decode(decoder) {
              const length = decoder.stepUint32();
              return decoder.stepString(length);
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/numbers/uInt",
  ["helpers"],
  function (exports_8, context_8) {
    "use strict";
    var helpers_ts_2, uInt8DataType, uInt16DataType, uInt32DataType;
    var __moduleName = context_8 && context_8.id;
    return {
      setters: [
        function (helpers_ts_2_1) {
          helpers_ts_2 = helpers_ts_2_1;
        },
      ],
      execute: function () {
        exports_8(
          "uInt8DataType",
          uInt8DataType = {
            test(data) {
              return typeof data === "number" && Number.isInteger(data) &&
                helpers_ts_2.range(
                  data,
                  helpers_ts_2.UINT_8_MIN_VALUE,
                  helpers_ts_2.UINT_8_MAX_VALUE,
                );
            },
            encode(encoder, data) {
              return encoder.uInt8ToBuffer(data);
            },
            decode(decoder) {
              return decoder.stepUint8();
            },
          },
        );
        exports_8(
          "uInt16DataType",
          uInt16DataType = {
            test(data) {
              return typeof data === "number" && Number.isInteger(data) &&
                helpers_ts_2.range(
                  data,
                  helpers_ts_2.UINT_16_MIN_VALUE,
                  helpers_ts_2.UINT_16_MAX_VALUE,
                );
            },
            encode(encoder, data) {
              return encoder.uInt16ToBuffer(data);
            },
            decode(decoder) {
              return decoder.stepUint16();
            },
          },
        );
        exports_8(
          "uInt32DataType",
          uInt32DataType = {
            test(data) {
              return typeof data === "number" && Number.isInteger(data) &&
                helpers_ts_2.range(
                  data,
                  helpers_ts_2.UINT_32_MIN_VALUE,
                  helpers_ts_2.UINT_32_MAX_VALUE,
                );
            },
            encode(encoder, data) {
              return encoder.uInt32ToBuffer(data);
            },
            decode(decoder) {
              return decoder.stepUint32();
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/numbers/nInt",
  ["helpers"],
  function (exports_9, context_9) {
    "use strict";
    var helpers_ts_3,
      helpers_ts_4,
      nInt8DataType,
      nInt16DataType,
      nInt32DataType;
    var __moduleName = context_9 && context_9.id;
    return {
      setters: [
        function (helpers_ts_3_1) {
          helpers_ts_3 = helpers_ts_3_1;
          helpers_ts_4 = helpers_ts_3_1;
        },
      ],
      execute: function () {
        exports_9(
          "nInt8DataType",
          nInt8DataType = {
            test(data) {
              return typeof data === "number" && Number.isInteger(data) &&
                helpers_ts_3.range(
                  data,
                  helpers_ts_4.NINT_8_MIN_VALUE,
                  helpers_ts_4.NINT_8_MAX_VALUE,
                );
            },
            encode(encoder, data) {
              return encoder.uInt8ToBuffer(data - helpers_ts_3.INT_8_MIN_VALUE);
            },
            decode(decoder) {
              return decoder.stepUint8() + helpers_ts_3.INT_8_MIN_VALUE;
            },
          },
        );
        exports_9(
          "nInt16DataType",
          nInt16DataType = {
            test(data) {
              return typeof data === "number" && Number.isInteger(data) &&
                helpers_ts_3.range(
                  data,
                  helpers_ts_4.NINT_16_MIN_VALUE,
                  helpers_ts_4.NINT_16_MAX_VALUE,
                );
            },
            encode(encoder, data) {
              return encoder.uInt16ToBuffer(
                data - helpers_ts_3.INT_16_MIN_VALUE,
              );
            },
            decode(decoder) {
              return decoder.stepUint16() + helpers_ts_3.INT_16_MIN_VALUE;
            },
          },
        );
        exports_9(
          "nInt32DataType",
          nInt32DataType = {
            test(data) {
              return typeof data === "number" && Number.isInteger(data) &&
                helpers_ts_3.range(
                  data,
                  helpers_ts_4.NINT_32_MIN_VALUE,
                  helpers_ts_4.NINT_32_MAX_VALUE,
                );
            },
            encode(encoder, data) {
              return encoder.uInt32ToBuffer(
                data - helpers_ts_3.INT_32_MIN_VALUE,
              );
            },
            decode(decoder) {
              return decoder.stepUint32() + helpers_ts_3.INT_32_MIN_VALUE;
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/numbers/float",
  ["helpers"],
  function (exports_10, context_10) {
    "use strict";
    var helpers_ts_5, float32DataType, float64DataType;
    var __moduleName = context_10 && context_10.id;
    return {
      setters: [
        function (helpers_ts_5_1) {
          helpers_ts_5 = helpers_ts_5_1;
        },
      ],
      execute: function () {
        exports_10(
          "float32DataType",
          float32DataType = {
            test(data) {
              return typeof data === "number" && !Number.isInteger(data) &&
                Math.fround(data) === data &&
                helpers_ts_5.range(data, -1.7E+308, 1.7E+308);
            },
            encode(encoder, data) {
              return encoder.float32ToBuffer(data);
            },
            decode(decoder) {
              return decoder.stepFloat32();
            },
          },
        );
        exports_10(
          "float64DataType",
          float64DataType = {
            test(data) {
              return typeof data === "number" && !Number.isInteger(data) &&
                helpers_ts_5.range(data, -3.4E+38, 3.4E+38);
            },
            encode(encoder, data) {
              return encoder.float64ToBuffer(data);
            },
            decode(decoder) {
              return decoder.stepFloat64();
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/number",
  [
    "datatypes/numbers/uInt",
    "datatypes/numbers/nInt",
    "datatypes/numbers/float",
  ],
  function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
      setters: [
        function (uInt_ts_1_1) {
          exports_11({
            "uInt8DataType": uInt_ts_1_1["uInt8DataType"],
            "uInt16DataType": uInt_ts_1_1["uInt16DataType"],
            "uInt32DataType": uInt_ts_1_1["uInt32DataType"],
          });
        },
        function (nInt_ts_1_1) {
          exports_11({
            "nInt8DataType": nInt_ts_1_1["nInt8DataType"],
            "nInt16DataType": nInt_ts_1_1["nInt16DataType"],
            "nInt32DataType": nInt_ts_1_1["nInt32DataType"],
          });
        },
        function (float_ts_1_1) {
          exports_11({
            "float32DataType": float_ts_1_1["float32DataType"],
            "float64DataType": float_ts_1_1["float64DataType"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register("datatypes/fixed", [], function (exports_12, context_12) {
  "use strict";
  var fixedValueDataType;
  var __moduleName = context_12 && context_12.id;
  return {
    setters: [],
    execute: function () {
      exports_12(
        "fixedValueDataType",
        fixedValueDataType = (value) => ({
          test(data) {
            return data === value;
          },
          encode(encoder, data) {
            return new ArrayBuffer(0);
          },
          decode(decoder) {
            return value;
          },
        }),
      );
    },
  };
});
System.register("datatypes/RegExp", [], function (exports_13, context_13) {
  "use strict";
  var RegExpDataType;
  var __moduleName = context_13 && context_13.id;
  return {
    setters: [],
    execute: function () {
      exports_13(
        "RegExpDataType",
        RegExpDataType = {
          test(data) {
            return data instanceof RegExp;
          },
          encode(encoder, data) {
            const string = data.source;
            const dataBuffer = encoder.stringToBuffer(string);
            const length = dataBuffer.byteLength;
            return encoder.combineBuffers(
              encoder.uInt16ToBuffer(length),
              dataBuffer,
            );
          },
          decode(decoder) {
            const length = decoder.stepUint16();
            const string = decoder.stepString(length);
            return new RegExp(string);
          },
        },
      );
    },
  };
});
System.register("datatypes/Error", [], function (exports_14, context_14) {
  "use strict";
  var ErrorDataType;
  var __moduleName = context_14 && context_14.id;
  return {
    setters: [],
    execute: function () {
      exports_14(
        "ErrorDataType",
        ErrorDataType = {
          test(data) {
            return data instanceof Error;
          },
          encode(encoder, data) {
            const nameBuffer = encoder.stringToBuffer(data.name);
            const nameLenthBuffer = encoder.uInt8ToBuffer(
              nameBuffer.byteLength,
            );
            const messageBuffer = encoder.stringToBuffer(data.message);
            const messageLenthBuffer = encoder.uInt8ToBuffer(
              messageBuffer.byteLength,
            );
            return encoder.combineBuffers(
              nameLenthBuffer,
              nameBuffer,
              messageLenthBuffer,
              messageBuffer,
            );
          },
          decode(decoder) {
            const nameLength = decoder.stepUint8();
            const name = decoder.stepString(nameLength);
            const messageLength = decoder.stepUint8();
            const message = decoder.stepString(messageLength);
            const error = new Error(message);
            error.name = name;
            error.stack = error.stack?.split("\n")[0];
            return error;
          },
        },
      );
    },
  };
});
System.register(
  "datatypes/ArrayBuffer",
  ["helpers"],
  function (exports_15, context_15) {
    "use strict";
    var helpers_ts_6,
      ArrayBuffer8DataType,
      ArrayBuffer16DataType,
      ArrayBuffer32DataType;
    var __moduleName = context_15 && context_15.id;
    return {
      setters: [
        function (helpers_ts_6_1) {
          helpers_ts_6 = helpers_ts_6_1;
        },
      ],
      execute: function () {
        exports_15(
          "ArrayBuffer8DataType",
          ArrayBuffer8DataType = {
            test(data) {
              return data instanceof ArrayBuffer &&
                data.byteLength <= helpers_ts_6.UINT_8_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.byteLength;
              return encoder.combineBuffers(
                encoder.uInt8ToBuffer(length),
                data,
              );
            },
            decode(decoder) {
              const length = decoder.stepUint8();
              return decoder.stepBuffer(length);
            },
          },
        );
        exports_15(
          "ArrayBuffer16DataType",
          ArrayBuffer16DataType = {
            test(data) {
              return data instanceof ArrayBuffer &&
                data.byteLength <= helpers_ts_6.UINT_16_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.byteLength;
              return encoder.combineBuffers(
                encoder.uInt16ToBuffer(length),
                data,
              );
            },
            decode(decoder) {
              const length = decoder.stepUint16();
              return decoder.stepBuffer(length);
            },
          },
        );
        exports_15(
          "ArrayBuffer32DataType",
          ArrayBuffer32DataType = {
            test(data) {
              return data instanceof ArrayBuffer &&
                data.byteLength <= helpers_ts_6.UINT_32_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.byteLength;
              return encoder.combineBuffers(
                encoder.uInt32ToBuffer(length),
                data,
              );
            },
            decode(decoder) {
              const length = decoder.stepUint32();
              return decoder.stepBuffer(length);
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/Array",
  ["helpers"],
  function (exports_16, context_16) {
    "use strict";
    var helpers_ts_7,
      fixedArrayDataType,
      Array8DataType,
      Array16DataType,
      Array32DataType;
    var __moduleName = context_16 && context_16.id;
    return {
      setters: [
        function (helpers_ts_7_1) {
          helpers_ts_7 = helpers_ts_7_1;
        },
      ],
      execute: function () {
        exports_16(
          "fixedArrayDataType",
          fixedArrayDataType = (length) => ({
            test(data) {
              return data instanceof Array && data.length === length;
            },
            encode(encoder, data) {
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                new ArrayBuffer(0),
              );
            },
            decode(decoder) {
              const array = [];
              while (length--) {
                const item = decoder.next();
                array.push(item);
              }
              return array;
            },
          }),
        );
        exports_16(
          "Array8DataType",
          Array8DataType = {
            test(data) {
              return data instanceof Array &&
                data.length <= helpers_ts_7.UINT_8_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.length;
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                encoder.uInt8ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint8();
              const array = [];
              while (length--) {
                const item = decoder.next();
                array.push(item);
              }
              return array;
            },
          },
        );
        exports_16(
          "Array16DataType",
          Array16DataType = {
            test(data) {
              return data instanceof Array &&
                data.length <= helpers_ts_7.UINT_16_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.length;
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                encoder.uInt16ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint16();
              const array = [];
              while (length--) {
                const item = decoder.next();
                array.push(item);
              }
              return array;
            },
          },
        );
        exports_16(
          "Array32DataType",
          Array32DataType = {
            test(data) {
              return data instanceof Array &&
                data.length <= helpers_ts_7.UINT_32_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.length;
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                encoder.uInt32ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint32();
              const array = [];
              while (length--) {
                const item = decoder.next();
                array.push(item);
              }
              return array;
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/Object",
  ["helpers"],
  function (exports_17, context_17) {
    "use strict";
    var helpers_ts_8,
      getType,
      fixedObjectDataType,
      Object8DataType,
      Object16DataType,
      Object32DataType;
    var __moduleName = context_17 && context_17.id;
    return {
      setters: [
        function (helpers_ts_8_1) {
          helpers_ts_8 = helpers_ts_8_1;
        },
      ],
      execute: function () {
        getType = (value) => Object.prototype.toString.call(value).slice(8, -1);
        exports_17(
          "fixedObjectDataType",
          fixedObjectDataType = (length) => ({
            test(data) {
              return getType(data) === "Object" &&
                Object.keys(data).length === length;
            },
            encode(encoder, data) {
              return Object.entries(data).reduce((buffer, [key, value]) =>
                encoder.combineBuffers(
                  buffer,
                  encoder.encode(key),
                  encoder.encode(value),
                ), new ArrayBuffer(0));
            },
            decode(decoder) {
              const object = {};
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                object[key] = value;
              }
              return object;
            },
          }),
        );
        exports_17(
          "Object8DataType",
          Object8DataType = {
            test(data) {
              return getType(data) === "Object" &&
                Object.keys(data).length <= helpers_ts_8.UINT_8_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = Object.keys(data).length;
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                encoder.uInt8ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint8();
              const object = {};
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                object[key] = value;
              }
              return object;
            },
          },
        );
        exports_17(
          "Object16DataType",
          Object16DataType = {
            test(data) {
              return getType(data) === "Object" &&
                Object.keys(data).length <= helpers_ts_8.UINT_16_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = Object.keys(data).length;
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                encoder.uInt16ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint16();
              const object = {};
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                object[key] = value;
              }
              return object;
            },
          },
        );
        exports_17(
          "Object32DataType",
          Object32DataType = {
            test(data) {
              return getType(data) === "Object" &&
                Object.keys(data).length <= helpers_ts_8.UINT_32_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = Object.keys(data).length;
              return data.reduce(
                (buffer, item) =>
                  encoder.combineBuffers(buffer, encoder.encode(item)),
                encoder.uInt32ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint32();
              const object = {};
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                object[key] = value;
              }
              return object;
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/Map",
  ["helpers"],
  function (exports_18, context_18) {
    "use strict";
    var helpers_ts_9, Map8DataType, Map16DataType, Map32DataType;
    var __moduleName = context_18 && context_18.id;
    return {
      setters: [
        function (helpers_ts_9_1) {
          helpers_ts_9 = helpers_ts_9_1;
        },
      ],
      execute: function () {
        exports_18(
          "Map8DataType",
          Map8DataType = {
            test(data) {
              return data instanceof Map &&
                data.size <= helpers_ts_9.UINT_8_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.size;
              console.log(data.size);
              return Array.from(data.entries()).reduce((buffer, [key, value]) =>
                encoder.combineBuffers(
                  buffer,
                  encoder.encode(key),
                  encoder.encode(value),
                ), encoder.uInt8ToBuffer(length));
            },
            decode(decoder) {
              let length = decoder.stepUint8();
              const map = new Map();
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                map.set(key, value);
              }
              return map;
            },
          },
        );
        exports_18(
          "Map16DataType",
          Map16DataType = {
            test(data) {
              return data instanceof Map &&
                data.size <= helpers_ts_9.UINT_16_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.size;
              return Array.from(data.entries()).reduce((buffer, [key, value]) =>
                encoder.combineBuffers(
                  buffer,
                  encoder.encode(key),
                  encoder.encode(value),
                ), encoder.uInt16ToBuffer(length));
            },
            decode(decoder) {
              let length = decoder.stepUint16();
              const map = new Map();
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                map.set(key, value);
              }
              return map;
            },
          },
        );
        exports_18(
          "Map32DataType",
          Map32DataType = {
            test(data) {
              return data instanceof Map &&
                data.size <= helpers_ts_9.UINT_32_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.size;
              return Array.from(data.entries()).reduce((buffer, [key, value]) =>
                encoder.combineBuffers(
                  buffer,
                  encoder.encode(key),
                  encoder.encode(value),
                ), encoder.uInt32ToBuffer(length));
            },
            decode(decoder) {
              let length = decoder.stepUint32();
              const map = new Map();
              while (length--) {
                const key = decoder.next();
                const value = decoder.next();
                map.set(key, value);
              }
              return map;
            },
          },
        );
      },
    };
  },
);
System.register(
  "datatypes/Set",
  ["helpers"],
  function (exports_19, context_19) {
    "use strict";
    var helpers_ts_10, Set8DataType, Set16DataType, Set32DataType;
    var __moduleName = context_19 && context_19.id;
    return {
      setters: [
        function (helpers_ts_10_1) {
          helpers_ts_10 = helpers_ts_10_1;
        },
      ],
      execute: function () {
        exports_19(
          "Set8DataType",
          Set8DataType = {
            test(data) {
              return data instanceof Set &&
                data.size <= helpers_ts_10.UINT_8_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.size;
              return data.reduce(
                (buffer, value) =>
                  encoder.combineBuffers(buffer, encoder.encode(value)),
                encoder.uInt8ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint8();
              const set = new Set();
              while (length--) {
                const value = decoder.next();
                set.add(value);
              }
              return set;
            },
          },
        );
        exports_19(
          "Set16DataType",
          Set16DataType = {
            test(data) {
              return data instanceof Set &&
                data.size <= helpers_ts_10.UINT_16_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.size;
              return data.reduce(
                (buffer, value) =>
                  encoder.combineBuffers(buffer, encoder.encode(value)),
                encoder.uInt16ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint16();
              const set = new Set();
              while (length--) {
                const value = decoder.next();
                set.add(value);
              }
              return set;
            },
          },
        );
        exports_19(
          "Set32DataType",
          Set32DataType = {
            test(data) {
              return data instanceof Set &&
                data.size <= helpers_ts_10.UINT_32_MAX_VALUE;
            },
            encode(encoder, data) {
              const length = data.size;
              return data.reduce(
                (buffer, value) =>
                  encoder.combineBuffers(buffer, encoder.encode(value)),
                encoder.uInt32ToBuffer(length),
              );
            },
            decode(decoder) {
              let length = decoder.stepUint32();
              const set = new Set();
              while (length--) {
                const value = decoder.next();
                set.add(value);
              }
              return set;
            },
          },
        );
      },
    };
  },
);
System.register("datatypes/BigInt", [], function (exports_20, context_20) {
  "use strict";
  var BigIntDataType;
  var __moduleName = context_20 && context_20.id;
  return {
    setters: [],
    execute: function () {
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
        }
        window["BigInt"] = function (value) {
          return new BigInt(value);
        };
        DataView.prototype.getBigInt64 = function (byteOffset) {
          const n2 = this.getUint32(byteOffset).toString(2);
          const n1 = this.getUint32(byteOffset + 4).toString(2);
          const string = `${n2}${n1}`;
          return parseInt(string, 2);
        };
        DataView.prototype.setBigInt64 = function (byteOffset, value) {
          const string = value.toString(2);
          const b1 = string.substr(32);
          const b2 = string.substr(0, 32);
          const n1 = parseInt(b1, 2);
          const n2 = parseInt(b2, 2);
          this.setUint32(byteOffset, n2);
          this.setUint32(byteOffset + 4, n1);
        };
        DataView.prototype.getBigUint64 = function (byteOffset) {
          const n2 = this.getUint32(byteOffset).toString(2);
          const n1 = this.getUint32(byteOffset + 4).toString(2);
          const string = `${n2}${n1}`;
          return parseInt(string, 2);
        };
        DataView.prototype.setBigUint64 = function (byteOffset, value) {
          const string = value.toString(2);
          const b1 = string.substr(32);
          const b2 = string.substr(0, 32);
          const n1 = parseInt(b1, 2);
          const n2 = parseInt(b2, 2);
          this.setUint32(byteOffset, n2);
          this.setUint32(byteOffset + 4, n1);
        };
      }
      exports_20(
        "BigIntDataType",
        BigIntDataType = {
          test(data) {
            return typeof data === "bigint";
          },
          encode(encoder, data) {
            const dataString = String(data);
            const dataBuffer = encoder.stringToBuffer(dataString);
            const lengthBuffer = encoder.uInt32ToBuffer(dataBuffer.byteLength);
            return encoder.combineBuffers(lengthBuffer, dataBuffer);
          },
          decode(decoder) {
            const length = Number(decoder.stepUint32());
            const data = decoder.stepString(length);
            return BigInt(data);
          },
        },
      );
    },
  };
});
System.register(
  "mod",
  [
    "Coder",
    "Encoder",
    "Decoder",
    "datatypes/Date",
    "datatypes/String",
    "datatypes/number",
    "datatypes/fixed",
    "datatypes/RegExp",
    "datatypes/Error",
    "datatypes/ArrayBuffer",
    "datatypes/Array",
    "datatypes/Object",
    "datatypes/Map",
    "datatypes/Set",
    "datatypes/BigInt",
  ],
  function (exports_21, context_21) {
    "use strict";
    var Coder_ts_1,
      Date_ts_1,
      String_ts_1,
      number_ts_1,
      number_ts_2,
      number_ts_3,
      fixed_ts_1,
      RegExp_ts_1,
      Error_ts_1,
      ArrayBuffer_ts_1,
      Array_ts_1,
      Object_ts_1,
      Map_ts_1,
      Set_ts_1,
      BigInt_ts_1,
      RESERVED,
      CUSTOM,
      map,
      coder;
    var __moduleName = context_21 && context_21.id;
    return {
      setters: [
        function (Coder_ts_1_1) {
          Coder_ts_1 = Coder_ts_1_1;
        },
        function (Encoder_ts_3_1) {
          exports_21({
            "Encoder": Encoder_ts_3_1["Encoder"],
          });
        },
        function (Decoder_ts_2_1) {
          exports_21({
            "Decoder": Decoder_ts_2_1["Decoder"],
          });
        },
        function (Date_ts_1_1) {
          Date_ts_1 = Date_ts_1_1;
        },
        function (String_ts_1_1) {
          String_ts_1 = String_ts_1_1;
        },
        function (number_ts_1_1) {
          number_ts_1 = number_ts_1_1;
          number_ts_2 = number_ts_1_1;
          number_ts_3 = number_ts_1_1;
        },
        function (fixed_ts_1_1) {
          fixed_ts_1 = fixed_ts_1_1;
        },
        function (RegExp_ts_1_1) {
          RegExp_ts_1 = RegExp_ts_1_1;
        },
        function (Error_ts_1_1) {
          Error_ts_1 = Error_ts_1_1;
        },
        function (ArrayBuffer_ts_1_1) {
          ArrayBuffer_ts_1 = ArrayBuffer_ts_1_1;
        },
        function (Array_ts_1_1) {
          Array_ts_1 = Array_ts_1_1;
        },
        function (Object_ts_1_1) {
          Object_ts_1 = Object_ts_1_1;
        },
        function (Map_ts_1_1) {
          Map_ts_1 = Map_ts_1_1;
        },
        function (Set_ts_1_1) {
          Set_ts_1 = Set_ts_1_1;
        },
        function (BigInt_ts_1_1) {
          BigInt_ts_1 = BigInt_ts_1_1;
        },
      ],
      execute: function () {
        exports_21("DateDataType", Date_ts_1.DateDataType);
        RESERVED = {
          test() {
            return false;
          },
          encode() {
            return new ArrayBuffer(0);
          },
          decode() {},
        };
        CUSTOM = RESERVED;
        map = new Map([
          [0x00, fixed_ts_1.fixedValueDataType(0)],
          [0x01, fixed_ts_1.fixedValueDataType(1)],
          [0x02, fixed_ts_1.fixedValueDataType(2)],
          [0x03, fixed_ts_1.fixedValueDataType(3)],
          [0x04, fixed_ts_1.fixedValueDataType(4)],
          [0x05, fixed_ts_1.fixedValueDataType(5)],
          [0x06, fixed_ts_1.fixedValueDataType(6)],
          [0x07, fixed_ts_1.fixedValueDataType(7)],
          [0x08, fixed_ts_1.fixedValueDataType(8)],
          [0x09, fixed_ts_1.fixedValueDataType(9)],
          [0x0a, fixed_ts_1.fixedValueDataType(10)],
          [0x0b, fixed_ts_1.fixedValueDataType(11)],
          [0x0c, fixed_ts_1.fixedValueDataType(12)],
          [0x0d, fixed_ts_1.fixedValueDataType(13)],
          [0x0e, fixed_ts_1.fixedValueDataType(14)],
          [0x0f, fixed_ts_1.fixedValueDataType(15)],
          [0x10, fixed_ts_1.fixedValueDataType(16)],
          [0x11, fixed_ts_1.fixedValueDataType(17)],
          [0x12, fixed_ts_1.fixedValueDataType(18)],
          [0x13, fixed_ts_1.fixedValueDataType(19)],
          [0x14, fixed_ts_1.fixedValueDataType(20)],
          [0x15, fixed_ts_1.fixedValueDataType(21)],
          [0x16, fixed_ts_1.fixedValueDataType(22)],
          [0x17, fixed_ts_1.fixedValueDataType(23)],
          [0x18, fixed_ts_1.fixedValueDataType(24)],
          [0x19, fixed_ts_1.fixedValueDataType(25)],
          [0x1a, fixed_ts_1.fixedValueDataType(26)],
          [0x1b, fixed_ts_1.fixedValueDataType(27)],
          [0x1c, fixed_ts_1.fixedValueDataType(28)],
          [0x1d, fixed_ts_1.fixedValueDataType(29)],
          [0x1e, fixed_ts_1.fixedValueDataType(30)],
          [0x1f, fixed_ts_1.fixedValueDataType(31)],
          [0x20, fixed_ts_1.fixedValueDataType(32)],
          [0x21, fixed_ts_1.fixedValueDataType(33)],
          [0x22, fixed_ts_1.fixedValueDataType(34)],
          [0x23, fixed_ts_1.fixedValueDataType(35)],
          [0x24, fixed_ts_1.fixedValueDataType(36)],
          [0x25, fixed_ts_1.fixedValueDataType(37)],
          [0x26, fixed_ts_1.fixedValueDataType(38)],
          [0x27, fixed_ts_1.fixedValueDataType(39)],
          [0x28, fixed_ts_1.fixedValueDataType(40)],
          [0x29, fixed_ts_1.fixedValueDataType(41)],
          [0x2a, fixed_ts_1.fixedValueDataType(42)],
          [0x2b, fixed_ts_1.fixedValueDataType(43)],
          [0x2c, number_ts_1.uInt8DataType],
          [0x2d, number_ts_1.uInt16DataType],
          [0x2e, number_ts_1.uInt32DataType],
          [0x2f, RESERVED],
          [0x30, fixed_ts_1.fixedValueDataType(-1)],
          [0x31, fixed_ts_1.fixedValueDataType(-2)],
          [0x32, fixed_ts_1.fixedValueDataType(-3)],
          [0x33, fixed_ts_1.fixedValueDataType(-4)],
          [0x34, fixed_ts_1.fixedValueDataType(-5)],
          [0x35, fixed_ts_1.fixedValueDataType(-6)],
          [0x36, fixed_ts_1.fixedValueDataType(-7)],
          [0x37, fixed_ts_1.fixedValueDataType(-8)],
          [0x38, fixed_ts_1.fixedValueDataType(-9)],
          [0x39, fixed_ts_1.fixedValueDataType(-10)],
          [0x3a, fixed_ts_1.fixedValueDataType(-11)],
          [0x3b, fixed_ts_1.fixedValueDataType(-12)],
          [0x3c, fixed_ts_1.fixedValueDataType(-13)],
          [0x3d, fixed_ts_1.fixedValueDataType(-14)],
          [0x3e, fixed_ts_1.fixedValueDataType(-15)],
          [0x3f, fixed_ts_1.fixedValueDataType(-16)],
          [0x40, fixed_ts_1.fixedValueDataType(-17)],
          [0x41, fixed_ts_1.fixedValueDataType(-18)],
          [0x42, fixed_ts_1.fixedValueDataType(-19)],
          [0x43, fixed_ts_1.fixedValueDataType(-20)],
          [0x44, fixed_ts_1.fixedValueDataType(-21)],
          [0x45, fixed_ts_1.fixedValueDataType(-22)],
          [0x46, fixed_ts_1.fixedValueDataType(-23)],
          [0x47, fixed_ts_1.fixedValueDataType(-24)],
          [0x48, fixed_ts_1.fixedValueDataType(-25)],
          [0x49, fixed_ts_1.fixedValueDataType(-26)],
          [0x4a, fixed_ts_1.fixedValueDataType(-27)],
          [0x4b, fixed_ts_1.fixedValueDataType(-28)],
          [0x4c, fixed_ts_1.fixedValueDataType(-29)],
          [0x4d, fixed_ts_1.fixedValueDataType(-30)],
          [0x4e, fixed_ts_1.fixedValueDataType(-31)],
          [0x4f, fixed_ts_1.fixedValueDataType(-32)],
          [0x50, fixed_ts_1.fixedValueDataType(-33)],
          [0x51, fixed_ts_1.fixedValueDataType(-34)],
          [0x52, fixed_ts_1.fixedValueDataType(-35)],
          [0x53, fixed_ts_1.fixedValueDataType(-36)],
          [0x54, fixed_ts_1.fixedValueDataType(-37)],
          [0x55, fixed_ts_1.fixedValueDataType(-38)],
          [0x56, fixed_ts_1.fixedValueDataType(-39)],
          [0x57, fixed_ts_1.fixedValueDataType(-40)],
          [0x58, fixed_ts_1.fixedValueDataType(-41)],
          [0x59, fixed_ts_1.fixedValueDataType(-42)],
          [0x5a, fixed_ts_1.fixedValueDataType(-43)],
          [0x5b, fixed_ts_1.fixedValueDataType(-44)],
          [0x5c, number_ts_2.nInt8DataType],
          [0x5d, number_ts_2.nInt16DataType],
          [0x5e, number_ts_2.nInt32DataType],
          [0x5f, RESERVED],
          [0x60, BigInt_ts_1.BigIntDataType],
          [0x61, RESERVED],
          [0x62, number_ts_3.float32DataType],
          [0x63, number_ts_3.float64DataType],
          [0x64, fixed_ts_1.fixedValueDataType(null)],
          [0x65, fixed_ts_1.fixedValueDataType(undefined)],
          [0x66, fixed_ts_1.fixedValueDataType(true)],
          [0x67, fixed_ts_1.fixedValueDataType(false)],
          [0x68, RESERVED],
          [0x69, RESERVED],
          [0x6a, RESERVED],
          [0x6b, RESERVED],
          [0x6c, RESERVED],
          [0x6d, RESERVED],
          [0x6e, RESERVED],
          [0x6f, RESERVED],
          [0x70, Date_ts_1.DateDataType],
          [0x71, RegExp_ts_1.RegExpDataType],
          [0x72, Error_ts_1.ErrorDataType],
          [0x73, RESERVED],
          [0x74, RESERVED],
          [0x75, RESERVED],
          [0x76, RESERVED],
          [0x77, RESERVED],
          [0x78, RESERVED],
          [0x79, RESERVED],
          [0x7a, RESERVED],
          [0x7b, RESERVED],
          [0x7c, ArrayBuffer_ts_1.ArrayBuffer8DataType],
          [0x7d, ArrayBuffer_ts_1.ArrayBuffer16DataType],
          [0x7e, ArrayBuffer_ts_1.ArrayBuffer32DataType],
          [0x7f, RESERVED],
          [0x80, String_ts_1.fixedStringDataType(0)],
          [0x81, String_ts_1.fixedStringDataType(1)],
          [0x82, String_ts_1.fixedStringDataType(2)],
          [0x83, String_ts_1.fixedStringDataType(3)],
          [0x84, String_ts_1.fixedStringDataType(4)],
          [0x85, String_ts_1.fixedStringDataType(5)],
          [0x86, String_ts_1.fixedStringDataType(6)],
          [0x87, String_ts_1.fixedStringDataType(7)],
          [0x88, String_ts_1.fixedStringDataType(8)],
          [0x89, String_ts_1.fixedStringDataType(9)],
          [0x8a, String_ts_1.fixedStringDataType(10)],
          [0x8b, String_ts_1.fixedStringDataType(11)],
          [0x8c, String_ts_1.fixedStringDataType(12)],
          [0x8d, String_ts_1.fixedStringDataType(13)],
          [0x8e, String_ts_1.fixedStringDataType(14)],
          [0x8f, String_ts_1.fixedStringDataType(15)],
          [0x90, String_ts_1.fixedStringDataType(16)],
          [0x91, String_ts_1.fixedStringDataType(17)],
          [0x92, String_ts_1.fixedStringDataType(18)],
          [0x93, String_ts_1.fixedStringDataType(19)],
          [0x94, String_ts_1.fixedStringDataType(20)],
          [0x95, String_ts_1.fixedStringDataType(21)],
          [0x96, String_ts_1.fixedStringDataType(22)],
          [0x97, String_ts_1.fixedStringDataType(23)],
          [0x98, String_ts_1.fixedStringDataType(24)],
          [0x99, String_ts_1.fixedStringDataType(25)],
          [0x9a, String_ts_1.fixedStringDataType(26)],
          [0x9b, String_ts_1.fixedStringDataType(27)],
          [0x9c, String_ts_1.string8DataType],
          [0x9d, String_ts_1.string16DataType],
          [0x9e, String_ts_1.string32DataType],
          [0x9f, RESERVED],
          [0xa0, Array_ts_1.fixedArrayDataType(0)],
          [0xa1, Array_ts_1.fixedArrayDataType(1)],
          [0xa2, Array_ts_1.fixedArrayDataType(2)],
          [0xa3, Array_ts_1.fixedArrayDataType(3)],
          [0xa4, Array_ts_1.fixedArrayDataType(4)],
          [0xa5, Array_ts_1.fixedArrayDataType(5)],
          [0xa6, Array_ts_1.fixedArrayDataType(6)],
          [0xa7, Array_ts_1.fixedArrayDataType(7)],
          [0xa8, Array_ts_1.fixedArrayDataType(8)],
          [0xa9, Array_ts_1.fixedArrayDataType(9)],
          [0xaa, Array_ts_1.fixedArrayDataType(10)],
          [0xab, Array_ts_1.fixedArrayDataType(11)],
          [0xac, Array_ts_1.Array8DataType],
          [0xad, Array_ts_1.Array16DataType],
          [0xae, Array_ts_1.Array32DataType],
          [0xaf, RESERVED],
          [0xb0, Object_ts_1.fixedObjectDataType(0)],
          [0xb1, Object_ts_1.fixedObjectDataType(1)],
          [0xb2, Object_ts_1.fixedObjectDataType(2)],
          [0xb3, Object_ts_1.fixedObjectDataType(3)],
          [0xb4, Object_ts_1.fixedObjectDataType(4)],
          [0xb5, Object_ts_1.fixedObjectDataType(5)],
          [0xb6, Object_ts_1.fixedObjectDataType(6)],
          [0xb7, Object_ts_1.fixedObjectDataType(7)],
          [0xb8, Object_ts_1.fixedObjectDataType(8)],
          [0xb9, Object_ts_1.fixedObjectDataType(9)],
          [0xba, Object_ts_1.fixedObjectDataType(10)],
          [0xbb, Object_ts_1.fixedObjectDataType(11)],
          [0xbc, Object_ts_1.Object8DataType],
          [0xbd, Object_ts_1.Object16DataType],
          [0xbe, Object_ts_1.Object32DataType],
          [0xbf, RESERVED],
          [0xc0, Map_ts_1.Map8DataType],
          [0xc1, Map_ts_1.Map16DataType],
          [0xc2, Map_ts_1.Map32DataType],
          [0xc3, RESERVED],
          [0xc4, Set_ts_1.Set8DataType],
          [0xc5, Set_ts_1.Set16DataType],
          [0xc6, Set_ts_1.Set32DataType],
          [0xc7, RESERVED],
          [0xc8, RESERVED],
          [0xc9, RESERVED],
          [0xca, RESERVED],
          [0xcb, RESERVED],
          [0xcc, RESERVED],
          [0xcd, RESERVED],
          [0xce, RESERVED],
          [0xcf, RESERVED],
          [0xd0, RESERVED],
          [0xd1, RESERVED],
          [0xd2, RESERVED],
          [0xd3, RESERVED],
          [0xd4, RESERVED],
          [0xd5, RESERVED],
          [0xd6, RESERVED],
          [0xd7, RESERVED],
          [0xd8, RESERVED],
          [0xd9, RESERVED],
          [0xda, RESERVED],
          [0xdb, RESERVED],
          [0xdc, RESERVED],
          [0xdd, RESERVED],
          [0xde, RESERVED],
          [0xdf, RESERVED],
          [0xe0, RESERVED],
          [0xe1, RESERVED],
          [0xe2, RESERVED],
          [0xe3, RESERVED],
          [0xe4, RESERVED],
          [0xe5, RESERVED],
          [0xe6, RESERVED],
          [0xe7, RESERVED],
          [0xe8, RESERVED],
          [0xe9, RESERVED],
          [0xea, RESERVED],
          [0xeb, RESERVED],
          [0xec, RESERVED],
          [0xed, RESERVED],
          [0xee, RESERVED],
          [0xef, RESERVED],
          [0xf0, CUSTOM],
          [0xf1, CUSTOM],
          [0xf2, CUSTOM],
          [0xf3, CUSTOM],
          [0xf4, CUSTOM],
          [0xf5, CUSTOM],
          [0xf6, CUSTOM],
          [0xf7, CUSTOM],
          [0xf8, CUSTOM],
          [0xf9, CUSTOM],
          [0xfa, CUSTOM],
          [0xfb, CUSTOM],
          [0xfc, CUSTOM],
          [0xfd, CUSTOM],
          [0xfe, CUSTOM],
          [0xff, CUSTOM],
        ]);
        exports_21("coder", coder = new Coder_ts_1.Coder(map));
      },
    };
  },
);

const __exp = __instantiate("mod", false);
export const Encoder = __exp["Encoder"];
export const Decoder = __exp["Decoder"];
export const DateDataType = __exp["DateDataType"];
export const coder = __exp["coder"];
