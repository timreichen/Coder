export function getType(value: any) {
  const name = Object.prototype.toString.call(value);
  return name.slice(8, -1)
}

// export function is(value: any, type: any) {
//   if (value === type: any) { return true }
//   if (isNaN(value) && isNaN(type)) { return true }
//   // if (value instanceof type: any) { return true }
//   return isType(value, type)
// }

export function isType(value: any, type: any) {
  return type.name === getType(value)
}

export function isNull(value: any) {
  return value === null
}
export function isUndefined(value: any) {
  return value === undefined
}

export function isNaN(value: any) {
  return Number.isNaN(value)
}

export function isBoolean(value: any) {
  // needs getType for new Boolean() check
  return value === true || value === false || getType(value) === "Boolean"
}
export function isNumber(value: any) {
  return getType(value) === "Number"
}
export function isInteger(value: any) {
  return Number.isInteger(value)
}
export function isFloat(value: any) {
  return isNumber(value) && !Number.isInteger(value)
}