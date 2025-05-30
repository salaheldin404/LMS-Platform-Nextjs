import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDropdownProps<T extends string> {
  value: T;
  className?: string;
  placeholder?: string;
  label?: string;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}

const SelectDropdown = <T extends string>({
  value,
  onChange,
  className,
  placeholder = "Select an option",
  label = "Select by",
  options,
}: SelectDropdownProps<T>) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`${className} bg-card md:w-[180px]`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
