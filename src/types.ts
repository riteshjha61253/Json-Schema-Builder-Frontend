export type FieldType =
  | "string"
  | "number"
  | "float"
  | "boolean"
  | "objectId"
  | "array"
  | "object"
  | "nested"; 
  
export interface Field {
  name: string;
  type: FieldType;
  key: string;
  children?: Field[];
  required?: boolean;
}
