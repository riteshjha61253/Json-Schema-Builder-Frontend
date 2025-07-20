import { Input, Select } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import type { Field } from "../types"

const { Option } = Select

interface Props {
  field: Field
  onChange: (key: keyof Field, value: any) => void
  onDelete: () => void
}

const fieldTypes = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "float", label: "Float" },
  { value: "boolean", label: "Boolean" },
  { value: "objectId", label: "Object ID" },
  { value: "array", label: "Array" },
  { value: "object", label: "Object" },
  { value: "nested", label: "Nested" },
]

export const FieldInputRow = ({ field, onChange, onDelete }: Props) => {
  return (
    <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <Input
        className="flex-1"
        placeholder="Field name"
        value={field.name}
        onChange={(e) => onChange("name", e.target.value)}
        style={{ minWidth: "120px" }}
      />
      <Select
        className="flex-1"
        value={field.type}
        onChange={(val) => onChange("type", val)}
        style={{ minWidth: "120px" }}
      >
        {fieldTypes.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
      <label className="switch flex-shrink-0">
        <input
          type="checkbox"
          checked={field.required || false}
          onChange={(e) => onChange("required", e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
      <CloseCircleOutlined
        onClick={onDelete}
        className="cursor-pointer text-xl text-gray-400 transition-colors hover:text-red-500"
        aria-label="Delete field"
      />
    </div>
  )
}
