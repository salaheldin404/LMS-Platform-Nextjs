import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IFormField } from "@/types/form";
import { Control, FieldValues } from "react-hook-form";

interface DynamicFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  fieldConfig: IFormField<T>;
}

const DynamicFormField = <T extends FieldValues>({
  control,
  fieldConfig,
}: DynamicFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={fieldConfig.name}>{fieldConfig.label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              id={fieldConfig.name}
              type={fieldConfig.type}
              autoComplete={fieldConfig.autoComplete}
              placeholder={fieldConfig.placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormField;
