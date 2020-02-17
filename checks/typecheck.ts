export function getType(value) {
  const name = Object.prototype.toString.call(value);
  return name.slice(8, -1)
}

// export function is(value: any, type) {
//   if (value === type) { return true }
//   if (isNaN(value) && isNaN(type)) { return true }
//   // if (value instanceof type) { return true }
//   return isType(value, type)
// }

export function isType(value, type) {
  return type.name === getType(value)
}

export function isNull(value) {
  return value === null
}
export function isUndefined(value) {
  return value === undefined
}

export function isNaN(value) {
  return Number.isNaN(value)
}

export function isBoolean(value) {
  // needs getType for new Boolean() check
  return value === true || value === false || getType(value) === "Boolean"
}
export function isNumber(value) {
  return getType(value) === "Number"
}
export function isInteger(value) {
  return Number.isInteger(value)
}
export function isFloat(value) {
  return isNumber(value) && !Number.isInteger(value)
}