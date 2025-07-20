import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { FieldEditor } from "./FieldEditor" 
import type { Field } from "../types"

interface Props {
  childrenFields: Field[]
  onAdd: () => void
  onChildChange: (index: number, updated: Field) => void
  onRemoveChild: (index: number) => void
}

export const NestedFieldList = ({ childrenFields, onAdd, onChildChange, onRemoveChild }: Props) => {
  return (
    <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
      {childrenFields.map((child, index) => (
        <FieldEditor
          key={child.key}
          field={child}
          onChange={(updated) => onChildChange(index, updated)}
          onDelete={() => onRemoveChild(index)}
        />
      ))}
      <Button type="dashed" icon={<PlusOutlined />} onClick={onAdd} className="mt-2 w-full" size="large">
        Add Nested Field
      </Button>
    </div>
  )
}
