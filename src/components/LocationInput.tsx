import { Input } from "@/components/ui/input"

interface LocationInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function LocationInput({ label, value, onChange }: LocationInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  )
}
