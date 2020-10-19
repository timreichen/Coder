import { assertEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { coder } from "./mod.ts";

Deno.test("null", () => {
  const data = null;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("undefined", () => {
  const data = undefined;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("true", () => {
  const data = true;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("false", () => {
  const data = false;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("fixed nInt", () => {
  const data = -1;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("fixed uInt", () => {
  const data = -32;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("fixed uInt 0", () => {
  const data = 0;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("fixed uInt 10", () => {
  const data = 10;
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("uInt8", () => {
  const data = 65;
  const expectedByteLength = 2;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("uInt16", () => {
  const data = 256;
  const expectedByteLength = 3;

  const buffer = coder.encode(data);

  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("uInt32", () => {
  const data = 1442511;
  const expectedByteLength = 5;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("nInt 8", () => {
  const data = -128;
  const expectedByteLength = 2;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);

  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("nInt16", () => {
  const data = -4095;
  const expectedByteLength = 3;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("nInt32", () => {
  const data = -1442511;
  const expectedByteLength = 5;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("BigInt", () => {
  const data = 14425111231354n;
  const expectedByteLength = 19;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("negative BigInt", () => {
  const data = -14425111231354n;
  const expectedByteLength = 20;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("Date", () => {
  const data = new Date();
  const expectedByteLength = 9;

  const buffer = coder.encode(data);

  const byteLength = buffer.byteLength;

  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data.getTime(),
    result.getTime(),
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("RegExp", () => {
  const data = /test[123]/g;
  const expectedByteLength = 12;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data.source,
    result.source,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("fixed String", () => {
  const data = "a".repeat(21);
  const expectedByteLength = 22;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("String8", () => {
  const data = "a".repeat(125);
  const expectedByteLength = 127;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("String16", () => {
  const data = "a".repeat(4000);
  const expectedByteLength = 4003;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("String32", () => {
  const data = "a".repeat(1442511);
  const expectedByteLength = 1442516;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("Fixed Object", () => {
  const data = {};
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("Object", () => {
  const data = { foo: true };
  const expectedByteLength = 6;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});

Deno.test("Fixed Array", () => {
  const data: any[] = [];
  const expectedByteLength = 1;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
Deno.test("Array", () => {
  const data = ["foo", true];
  const expectedByteLength = 6;

  const buffer = coder.encode(data);
  const byteLength = buffer.byteLength;
  assertEquals(
    byteLength,
    expectedByteLength,
    `byteLength ${byteLength} is expected to be ${expectedByteLength}`,
  );
  const result = coder.decode(buffer);
  assertEquals(
    data,
    result,
    `decoded value ${data} is not equal decoded value ${result}`,
  );
});
