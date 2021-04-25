# Coder

Data encoder and decoder that cares about data types.

## Why do I need Coder?

Coder encodes javascript data into a buffer and decodes it back. Therefore data
can be sent over the network without losing data types.

- Supports a lot of types out of the box
- is extendable

### I can do that with JSON, right?

JSON is great, except it doesn't support a lot of types.

```js
const date = new Date();

const string = JSON.stringify(date); // "2020-02-13T13:16:43.096Z"
JSON.parse(string); // SyntaxError
```

In comparison Coder supports a lot of different types by default so your data
will have the same type after decoding.

```ts
import { coder } from "https://deno.land/x/coder/mod.ts";

const date = new Date();
const buffer = coder.encode(date); // ArrayBuffer
coder.decode(buffer); // Date()
```

### But there is messagepack and protocol buffers, right?

Yes, and this project is inspired by messagepack. But Coder is specifically
designed between comunicating between client- and server-side javascript.
Therefore it only cares about javascript types.

## Usage

```typescript
import { coder } from "https://deno.land/x/coder/mod.ts";

const date = new Date();
const buffer = coder.encode(data);
coder.decode(buffer); // Date()
```

## Supported types

Coder supports lots of types out of the box:

- [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- [undefined](https://developer.mozilla.org/en-US/docs/Glossary/undefined)
- [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
- [Infinity and -Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)
- [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

It needs to be discussed what additional types should be supported by default.
Some possible candidates are:

- [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)
- [EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)
- [InternalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/InternalError)
- [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)
- [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)
- [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
- [URIError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError)
  <br>
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
  <br>
- [Int8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
- [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
- [Int16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)
- [Uint16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)
- [Int32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)
- [Uint32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)
- [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)
- [Float64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)
- [BigInt64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)
- [BigUint64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)
  <br>
- [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

### Custom DataType Definition

Coder can easily be extended with custom DataTypes.

Example:

#### 1. Define Custom DataType

```typescript
// SymbolDataType.ts
import { DataType, Decoder, Encoder } from "https://deno.land/x/coder/mod.ts";

export class SymbolDataType extends DataType {
  // The test method returns true if data should be decoded for that type
  test(data: unknown) {
    return typeof data === "Symbol";
  },
  // The encode method transforms the data into a buffer
  encode(encoder: Encoder, data: Symbol) {
    const description = data.description; // get data to encode
    const dataBuffer = encoder.stringToBuffer(description); // convert description to buffer
    const lengthBuffer = encoder.uInt8ToBuffer(dataBuffer.byteLength); // convert length to buffer
    return encoder.combineBuffers(lengthBuffer, dataBuffer); // return combined buffer
  },
  // The decode method transforms the buffer back to a value
  decode(decoder: Decoder) {
    const length = decoder.stepUint8(); // get length
    const description = decoder.stepString(length); // get description
    return Symbol(description); // create Symbol with description
  },
};
```

#### 2. Set Custom DataType

There are 16 slots reserved for custom DataTypes: `0xf0`-`0xff`. Chose a free
one and set the DataType.

```typescript
import { coder } from "https://deno.land/x/coder/mod.ts";
// import custom DataType
import { SymbolDataType } from "./path/to/SymbolDataType.ts";
// set custom DataType
coder.set(0xf0, SymbolDataType);
```

That's it! Now Symbols will be encoded and decoded.

#### 3. Use Custom DataType

```typescript
const data = { mySymbol: Symbol("foo") };
const buffer = coder.encode(data);
coder.decoder(buffer); // { mySymbol: Symbol(foo) }
```
