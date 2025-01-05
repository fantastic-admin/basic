import { createDefu } from 'defu'

/** 合并对象 */
const merge = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

/** 合并对象，并移除不存在的属性 */
const mergeWithoutUndefinedProps = createDefu((obj, key, value) => {
  if (obj[key] === undefined) {
    delete obj[key]
    return true
  }
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

function isObject(value: any) {
  return typeof value === 'object' && !Array.isArray(value)
}
/** 比较两个对象，提取出不同的部分 */
function diffTwoObj(originalObj: Record<string, any>, diffObj: Record<string, any>) {
  if (!isObject(originalObj) || !isObject(diffObj)) {
    return diffObj
  }
  const diff: Record<string, any> = {}
  for (const key in diffObj) {
    const originalValue = originalObj[key]
    const diffValue = diffObj[key]
    if (JSON.stringify(originalValue) !== JSON.stringify(diffValue)) {
      if (isObject(originalValue) && isObject(diffValue)) {
        const nestedDiff = diffTwoObj(originalValue, diffValue)
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff
        }
      }
      else {
        diff[key] = diffValue
      }
    }
  }
  return diff
}

export {
  diffTwoObj,
  merge,
  mergeWithoutUndefinedProps,
}
