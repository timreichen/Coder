import { yellow, cyan, magenta, green, red } from "https://deno.land/std/fmt/colors.ts"
import { assert, assertEquals, assertThrowsAsync } from "https://deno.land/std/testing/asserts.ts"
import { coder } from "./mod.ts"

async function test(name: string, callback: Function) {

  const start = performance.now()
  const {error} = await new Promise(async (resolve, reject) => {
    try {
      await callback()
      resolve({error: null})
    } catch(error) {
      resolve({error})
    }
  })

  const end = performance.now()
  const time = end-start
  const status =  `${error ? `${red(`✗ failed`)}` : green(`✓ succeeded`) }`
  console.log(cyan(`test`), name)
  console.group()
  console.log(magenta(`time`), `${time}ms`)
  console.log(magenta(`status`), status);
  if (error) {
    console.log(error)
  }
  console.groupEnd()
}

await test("null" , _ => {
  const data = null
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("undefined" , _ => {
  const data = undefined
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("true" , _ => {
  const data = true
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("false" , _ => {
  const data = false
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

// await test("Boolean Constructor" , _ => {
//   const data = new Boolean(1)
//   const expectedByteLength = 1

//   const buffer = coder.encode(data)
//   const byteLength = buffer.byteLength
//   assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
//   const result = coder.decode(buffer)
//   assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
// })


await test("Infinity" , _ => {
  const data = Infinity
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("-Infinity" , _ => {
  const data = -Infinity
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Fixed Int -1" , _ => {
  const data = -1
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Fixed Int -32", _ => {
  const data = -32
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Int8", _ => {
  const data = -126
  const expectedByteLength = 2

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Int16", _ => {
  const data = -4095
  const expectedByteLength = 3

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Int32", _ => {
  const data = -1442511
  const expectedByteLength = 5

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Number Constructor" , _ => {
  const data = Number(1)
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})


await test("Fixed uInt 0" , _ => {
  const data = 0
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Fixed uInt 10", _ => {
  const data = 10
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("uInt8", _ => {
  const data = 65
  const expectedByteLength = 2

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("uInt16", _ => {
  const data = 256
  const expectedByteLength = 3

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("uInt32", _ => {
  const data = 1442511
  const expectedByteLength = 5

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("BigInt", _ => {
  const data = 14425111231354n
  const expectedByteLength = 19

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Negative BigInt", _ => {
  const data = -14425111231354n
  const expectedByteLength = 20

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})


await test("Date", _ => {
  const data = new Date()
  const expectedByteLength = 9

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data.getTime(), result.getTime(), `decoded value ${data} is not equal decoded value ${result}`)
})

await test("RegExp", _ => {
  const data = /test[123]/g
  const expectedByteLength = 12

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data.source, result.source, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Fixed String 0", _ => {
  const data = "a".repeat(0)
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("Fixed String 21", _ => {
  const data = "a".repeat(21)
  const expectedByteLength = 22

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("String8", _ => {
  const data = "a".repeat(125)
  const expectedByteLength = 127

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("String16", _ => {
  const data = "a".repeat(4000)
  const expectedByteLength = 4003

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})
await test("String32", _ => {
  const data = "a".repeat(1442511)
  const expectedByteLength = 1442516

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("RegExp", _ => {
  const data = /[123]+/g
  const expectedByteLength = 9

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data.source, result.source, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Object 0", _ => {
  const data = {}
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Object 1", _ => {
  const data = {foo : true }
  const expectedByteLength = 6

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Array 0", _ => {
  const data = []
  const expectedByteLength = 1

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})

await test("Array 1", _ => {
  const data = ["foo", true ]
  const expectedByteLength = 6

  const buffer = coder.encode(data)
  const byteLength = buffer.byteLength
  assertEquals(byteLength, expectedByteLength, `byteLength ${byteLength} is expected to be ${expectedByteLength}`)
  const result = coder.decode(buffer)
  assertEquals(data, result, `decoded value ${data} is not equal decoded value ${result}`)
})