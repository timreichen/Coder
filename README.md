# Coder

Encode and decode data and retain data types.

## Why do I need Coder?

Coder encodes javacript data into a buffer and decodes it back. Therefore data can be sent over the network without losing data types.

- Works out of the box
- is extendable

### I can do that with JSON, right?
JSON is great, except it doesn't support a lot of types.
```js
const date = new Date()

const string = JSON.stringify(date) // "2020-02-13T13:16:43.096Z"
JSON.parse(string) // SyntaxError
```
In comparison Coder supports a lot of different types by default so your data will have the same type after decoding.
```js
import { coder } from "https://deno.land/x/coder/mod.ts"
const date = new Date()

const buffer = coder.encode(date) // ArrayBuffer
coder.decode(buffer) // Date()
```

### But there is messagepack and protocol buffers, right?
Yes, and this project is inspired by messagepack. But Coder is specifically designed between comunicating between client- and server-side javascript. Therefore it only cares about javacript types.

## Usage
```typescript
import { coder } from "https://deno.land/x/coder/mod.ts"

const date = new Date()
const buffer = coder.encode(data)
coder.decode(buffer) // Date()
```

## Supported types

Coder supports lots of types out of the box:

* [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
* [undefined](https://developer.mozilla.org/en-US/docs/Glossary/undefined)
<br>

* [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
  **Limitation**: Webkit does not yet support ```BigInt```. Coder uses a small polyfill with limitations for DataView ```getBigInt64```, ```setBigInt64```, ```getBigUint64```, ```setBigUint64```.
  <br>
* [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

  <br>
* [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

  <br>

* [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  <br>

* [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

It needs to be discussed what additional types should be supported by default.
Some possible candidates are:
* [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
* [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
* [Infinity and -Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

### Custom DataType Definition
Coder can easily be extended with custom DataTypes.

Example:
#### 1. Define Custom DataType

```typescript
// SymbolDataType.ts
import { DataType, Encoder, Decoder } from "https://deno.land/x/coder/mod.ts"

export const SymbolDataType = {
  // The test method returns true if data should be decoded for that type.
  test(data: any) { return typeof data === "Symbol" },
  // The encode method transforms the data into a buffer, where the first byte must be the type of the DataType.
  encode(encoder: Encoder, data: Symbol) {
    const description = data.description // get data to encode
    const dataBuffer = encoder.stringToBuffer(description) // convert description to buffer
    const lengthBuffer = encoder.uInt8ToBuffer(dataBuffer.byteLength) // convert length to buffer
    return encoder.combineBuffers(lengthBuffer, dataBuffer) // create a buffer where the first byte must be the type id byte
  },
  // The decode method transforms the buffer back to a value.
  decode(decoder: Decoder) {
    const length = decoder.stepUint8() // get length
    const description = decoder.stepString(length) // get description
    return Symbol(description) // create Symbol with description
  }
}
```
#### 2. Register Custom DataType
```typescript
import { coder } from "https://deno.land/x/coder/mod.ts"
// import custom DataType
import { SymbolDataType } from "./path/to/SymbolDataType.ts"
// Register custom DataType
coder.register(0xf0, SymbolDataType)
```

That's it! Now Symbols will be encoded and decoded.

#### 3. Use Custom DataType
```typescript
const data = { mySymbol: Symbol("foo") }
const buffer = coder.encode(data)
coder.decoder(buffer) // { mySymbol: Symbol(foo) }
```
