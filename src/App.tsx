import { useState } from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import type { Field } from "./types"
import { FieldEditor } from "./components/FieldEditor"
import { JSONPreview } from "./components/JsonPreview"
import "./App.css"

export default function App() {
  const [fields, setFields] = useState<Field[]>([])

  const addField = () => {
    setFields([
      ...fields,
      {
        name: "",
        type: "string",
        key: Math.random().toString(36).substr(2, 9),
      },
    ])
  }

  const updateField = (index: number, updated: Field) => {
    const updatedFields = [...fields]
    updatedFields[index] = updated
    setFields(updatedFields)
  }

  const deleteField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setFields(updatedFields)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:p-2">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800 lg:text-4xl">JSON Schema Builder</h1>
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 lg:grid-cols-[65%_1fr] lg:gap-2">

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Schema Fields</h2>
          {fields.map((field, index) => (
            <FieldEditor
              key={field.key}
              field={field}
              onChange={(updated) => updateField(index, updated)}
              onDelete={() => deleteField(index)}
            />
          ))}
          <Button type="primary" icon={<PlusOutlined />} onClick={addField} className="mt-4 w-full" size="large">
            Add Field
          </Button>
        </div>

        <div className="rounded-xl bg-white p-2 shadow-lg">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">Live JSON Preview</h2>
          <JSONPreview fields={fields} />
        </div>
      </div>
    </div>
  )
}
