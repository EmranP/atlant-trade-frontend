import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps {
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

export default function FilterSelect({
  label,
  placeholder = "Все",
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <p className="mb-2 font-medium">{label}</p>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full bg-gray-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
