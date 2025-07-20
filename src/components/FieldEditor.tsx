import { useState } from "react"
import type { Field } from "../types"
import { FieldInputRow } from "./FieldInputRow"
import { NestedFieldList } from "./NestedFieldList"

interface Props {
  field: Field
  onChange: (updated: Field) => void
  onDelete: () => void
}

export function FieldEditor({ field, onChange, onDelete }: Props) {
  const [children, setChildren] = useState(field.children || [])

  const update = (key: keyof Field, value: any) => {
    const updatedField = { ...field, [key]: value }
    if (key === "type" && value !== "nested") {
      updatedField.children = undefined
      setChildren([])
    }
    onChange(updatedField)
  }

  const handleChildChange = (index: number, updatedChild: Field) => {
    const updatedChildren = [...children]
    updatedChildren[index] = updatedChild
    setChildren(updatedChildren)
    onChange({ ...field, children: updatedChildren })
  }

  const addChild = () => {
    const newChild: Field = {
      name: "",
      type: "string",
      key: Math.random().toString(36).substr(2, 9),
    }
    const updatedChildren = [...children, newChild]
    setChildren(updatedChildren)
    onChange({ ...field, children: updatedChildren })
  }

  const removeChild = (index: number) => {
    const updatedChildren = [...children]
    updatedChildren.splice(index, 1)
    setChildren(updatedChildren)
    onChange({ ...field, children: updatedChildren })
  }

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <FieldInputRow field={field} onChange={update} onDelete={onDelete} />
      {field.type === "nested" && (
        <NestedFieldList
          childrenFields={children}
          onAdd={addChild}
          onChildChange={handleChildChange}
          onRemoveChild={removeChild}
        />
      )}
    </div>
  )
}
