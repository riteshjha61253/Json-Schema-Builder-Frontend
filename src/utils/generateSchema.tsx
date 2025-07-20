import type { Field } from "../types"

export const generateSchema = (fields: Field[]): any => {
  const schema: any = {}
  fields.forEach((f) => {
    let baseType: any
    switch (f.type) {
      case "nested":
        baseType = f.children ? generateSchema(f.children) : {}
        break
      case "string":
        baseType = f.required ? "string" : "STRING"
        break
      case "number":
        baseType = f.required ? 0 : "number"
        break
      case "float":
        baseType = f.required ? 0.0 : "float"
        break
      case "boolean":
        baseType = f.required ? true : "boolean"
        break
      case "objectId":
        baseType = f.required ? "OBJECTID" : "objectId"
        break
      case "array":
        baseType = f.required ? [] : "array"
        break
      case "object":
        baseType = f.required ? {} : "object"
        break
      default:
        baseType = f.type
    }
    schema[f.name] = baseType
  })
  return schema
}
