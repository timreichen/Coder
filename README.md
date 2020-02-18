# Coder

Encode and decode data and retain data types.

## Why do I need Coder?

Coder encodes data into a buffer that can be sent over the network and be decoded again.


### I can do that with JSON, right?
JSON is great, except it doesn't support a lot of types. In comparison Coder supports a lot of different types so your objects will be objects again on the other side.

```js
  const date = new Date()
  
  const string = JSON.stringify(date) // "2020-02-13T13:16:43.096Z"
  JSON.parse(string) // SyntaxError

  const buffer = encoder.encode(date)
  decoder.decode(buffer) // Date
```

### But there is messagepack and protocol buffers, right?
Yes, and this project is inspired by messagepack. It encodes data types similarly but is designed to be extended by custom types.

## Usage
```typescript
import { coder } from "https://raw.githubusercontent.com/timreichen/Coder/master/mod.ts"

const data = { hello: "hello world" }
const buffer = coder.encode(data)
const encodedData = coder.decode(buffer)
console.log(encodedData) // { hello: "world" }
```

## Supported types

It supports lots of types out of the box:

* [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
* [undefined](https://developer.mozilla.org/en-US/docs/Glossary/undefined)
* [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) (Integer and Float)
* [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

  <br>

* [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
* [Infinity and -Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

  <br>

* [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

  <br>

* [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

  <br>

* [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

**Info**: It needs to be discussed what additional types should be supported by default.
Some possible candidates are:
* [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
* [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
* [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

### Custom DataType Definition
If you want to encode and decode a custom DataType (for example [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)) it  is easy to do so.
DataTypes are declared by extending the DataType class.

### Define Custom DataType

```typescript
import { DataType, Encoder, Decoder } from "https://raw.githubusercontent.com/timreichen/Coder/master/mod.ts"

export class ErrorDataType extends DataType {

  // The validate method returns true if data should be decoded for that type.
  validate(data) {
    return data instanceof Error && data.message.length <= 255 // limit message length to 255
  }
  
  // The encode method transforms the data into a buffer, where the first byte must be the type of the DataType.
  encode(encoder: Encoder, data: Error) {
    const idBuffer = Encoder.uInt8ToBuffer(this.id)
    const message = data.message // get data to encode
    const dataBuffer = Encoder.stringToBuffer(message) // convert message to buffer
    const length = dataBuffer.byteLength // get length of dataBuffer
    const lengthBuffer = Encoder.uInt8ToBuffer(length) // convert length to buffer
    return Encoder.combineBuffers(idBuffer, lengthBuffer, dataBuffer) // create a buffer where the first byte must be the type id byte
  }
  
  // The decode method transforms the buffer back to a value.
  decode(decoder: Decoder) {
    decoder.stepBytes(1) // step over the id byte
    const length = decoder.stepUint8() // get length
    const message = decoder.stepString(length) // get message
    return new Error(message) // create error with message
  }
}

```

#### Register Custom DataType
```typescript
import { coder } from "https://raw.githubusercontent.com/timreichen/Coder/master/mod.ts"
import { ErrorDataType } from "./path/to/ErrorDataType.ts"

// Create a new instance of the defined DataType. It must be passed a valid type id. Custom types use bytes from 0xf0 to 0xff.
const errorDataType = new DateDataType(0xf0)

// Register the DataType
coder.register(errorDataType)

```

#### Use Custom DataType
```typescript

const data = { error: new Error("Something went wrong") }
const buffer = coder.encode(data)
const encodedData = coder.decoder(buffer)
console.log(encodedData) // { error: Error: Something went wrong }

```

## Type bytes
**byte**|
:-----:|
value|

**00**|**01**|**02**|**03**|**04**|**05**|**06**|**07**|**08**|**09**|**0A**|**0B**|**0C**|**0D**|**0E**|**0F**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15
**10**|**11**|**12**|**13**|**14**|**15**|**16**|**17**|**18**|**19**|**1A**|**1B**|**1C**|**1D**|**1E**|**1F**
16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31
**20**|**21**|**22**|**23**|**24**|**25**|**26**|**27**|**28**|**29**|**2A**|**2B**|**2C**|**2D**|**2E**|**2F**
32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47
**30**|**31**|**32**|**33**|**34**|**35**|**36**|**37**|**38**|**39**|**3A**|**3B**|**3C**|**3D**|**3E**|**3F**
48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63
**40**|**41**|**42**|**43**|**44**|**45**|**46**|**47**|**48**|**49**|**4A**|**4B**|**4C**|**4D**|**4E**|**4F**
-1|-2|-3|-4|-5|-6|-7|-8|-9|-10|-11|-12|-13|-14|-15|-16
**50**|**51**|**52**|**53**|**54**|**55**|**56**|**57**|**58**|**59**|**5A**|**5B**|**5C**|**5D**|**5E**|**5F**
-17|-18|-19|-20|-21|-22|-23|-24|-25|-26|-27|-28|-29|-30|-31|-32
**60**|**61**|**62**|**63**|**64**|**65**|**66**|**67**|**68**|**69**|**6A**|**6B**|**6C**|**6D**|**6E**|**6F**
-33|-34|-35|-36|-37|-38|-39|-40|-41|-42|-43|-44|-45|-46|-47|-48
**70**|**71**|**72**|**73**|**74**|**75**|**76**|**77**|**78**|**79**|**7A**|**7B**|**7C**|**7D**|**7E**|**7F**
-49|-50|-51|-52|-53|-54|-55|-56|-57|-58|-59|-60|-61|-62|-63|-64
**80**|**81**|**82**|**83**|**84**|**85**|**86**|**87**|**88**|**89**|**8A**|**8B**|**8C**|**8D**|**8E**|**8F**
null|undefined|false|true|Date|_reserved_|_reserved_|_reserved_|RegExp|_reserved_|_reserved_|_reserved_|_reserved_|_reserved_|Infinity|-Infinity
**90**|**91**|**92**|**93**|**94**|**95**|**96**|**97**|**98**|**99**|**9A**|**9B**|**9C**|**9D**|**9E**|**9F**
String 0|String 1|String 2|String 3|String 4|String 5|String 6|String 7|String 8|String 9|String 10|String 11|String 12|String 13|String 14|String 15
**A0**|**A1**|**A2**|**A3**|**A4**|**A5**|**A6**|**A7**|**A8**|**A9**|**AA**|**AB**|**AC**|**AD**|**AE**|**AF**
String 16|String 17|String 18|String 19|String 20|String 21|String 22|String 23|String 24|String 25|String 26|String 27|String 28|String 29|String 30|String 31
**B0**|**B1**|**B2**|**B3**|**B4**|**B5**|**B6**|**B7**|**B8**|**B9**|**BA**|**BB**|**BC**|**BD**|**BE**|**BF**
Object 0|Object 1|Object 2|Object 3|Object 4|Object 5|Object 6|Object 7|Array 0|Array 1|Array 2|Array 3|Array 4|Array 5|Array 6|Array 7
**C0**|**C1**|**C2**|**C3**|**C4**|**C5**|**C6**|**C7**|**C8**|**C9**|**CA**|**CB**|**CC**|**CD**|**CE**|**CF**
Int 8 |Int 16|Int 32 |_reserved_|Uint 8|Uint 16|Uint 32|_reserved_|BigInt|_reserved_|Float 32|Float 64|_reserved_|_reserved_|_reserved_| _reserved_
**D0**|**D1**|**D2**|**D3**|**D4**|**D5**|**D6**|**D7**|**D8**|**D9**|**DA**|**DB**|**DC**|**DD**|**DE**|**DF**
ArrayBuffer 8|ArrayBuffer 16|ArrayBuffer 32|_reserved_|String 8|String 16|String 32|_reserved_|Object 8|Object 16|Object 32|_reserved_|Array 8|Array 16|Array 32| _reserved_
**E0**|**E1**|**E2**|**E3**|**E4**|**E5**|**E6**|**E7**|**E8**|**E9**|**EA**|**EB**|**EC**|**ED**|**EE**|**EF**
Map 8|Map 16|Map 32|_reserved_|Set 8|Set 16|Set 32|_reserved_|_reserved_|_reserved_|_reserved_|_reserved_|_reserved_|_reserved_|_reserved_| _reserved_
**F0**|**F1**|**F2**|**F3**|**F4**|**F5**|**F6**|**F7**|**F8**|**F9**|**FA**|**FB**|**FC**|**FD**|**FE**|**FF**
| _custom_ | _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_| _custom_|  _custom_| _custom_
