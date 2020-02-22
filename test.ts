import { test, runTests } from "https://deno.land/std@v0.32.0/testing/mod.ts";
import { assert, assertEquals, assertThrowsAsync } from "https://deno.land/std/testing/asserts.ts"
import { coder } from "./mod.ts"

test(function test_null() {
  const data = null
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_undefined() {
  const data = undefined
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_true() {
  const data = true
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_false() {
  const data = false
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

// test(function test_boolean_constructor() {
//   const data = new Boolean(1)
//   const expectedByteLength = 1

//   const buffer = coder.encode(data)
//   const byteLength = buffer.byteLength
//   assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
//   const result = coder.decode(buffer)
//   assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
// })


test(function test_infinity() {
  const data = Infinity
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_negative_infinity() {
  const data = -Infinity
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_fixed_int_negative_1() {
  const data = -1
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_fixed_int_32() {
  const data = -32
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_int_8() {
  const data = -126
  const expectedByteLength = 2

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_int_16() {
  const data = -4095
  const expectedByteLength = 3

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_int_32() {
  const data = -1442511
  const expectedByteLength = 5

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_number_constructor() {
  const data = Number(1)
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})


test(function test_fixed_uInt_0() {
  const data = 0
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_fixed_uInt_10() {
  const data = 10
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_uInt8() {
  const data = 65
  const expectedByteLength = 2

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_uInt16() {
  const data = 256
  const expectedByteLength = 3

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_uInt32() {
  const data = 1442511
  const expectedByteLength = 5

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_bigInt() {
  const data = 14425111231354n
  const expectedByteLength = 19

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_negative_bigInt() {
  const data = -14425111231354n
  const expectedByteLength = 20

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})


test(function test_Date() {
  const data = new Date()
  const expectedByteLength = 9

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data.getTime(), result.getTime(), `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_RegExp() {
  const data = /test[123]/g
  const expectedByteLength = 12

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data.source, result.source, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_fixed_String_0() {
  const data = "a".repeat(0)
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_fixed_String_21() {
  const data = "a".repeat(21)
  const expectedByteLength = 22

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_String_8() {
  const data = "a".repeat(125)
  const expectedByteLength = 127

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_String_16() {
  const data = "a".repeat(4000)
  const expectedByteLength = 4003

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
test(function test_String_32() {
  const data = "a".repeat(1442511)
  const expectedByteLength = 1442516

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_RegExp() {
  const data = /[123]+/g
  const expectedByteLength = 9

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data.source, result.source, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_Object_0() {
  const data = {}
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_Object_1() {
  const data = {foo : true }
  const expectedByteLength = 6

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_Array_0() {
  const data = []
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

test(function test_Array_1() {
  const data = ["foo", true ]
  const expectedByteLength = 6

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

runTests()