import { generateSchema } from "../utils/generateSchema"
import type { Field } from "../types"
import { Button, message } from "antd"
import { CopyOutlined } from "@ant-design/icons"

export function JSONPreview({ fields }: { fields: Field[] }) {
  const schemaJSON = JSON.stringify(generateSchema(fields), null, 2)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(schemaJSON)
      message.success("JSON copied to clipboard!")
    } catch (err) {
      message.error("Failed to copy JSON")
    }
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex justify-end">
        <Button icon={<CopyOutlined />} onClick={handleCopy} type="default">
          Copy JSON
        </Button>
      </div>
      <pre className="max-h-[60vh] overflow-auto rounded-lg bg-gray-800 p-4 text-sm font-mono text-gray-50 shadow-inner">
        {schemaJSON}
      </pre>
    </div>
  )
}
