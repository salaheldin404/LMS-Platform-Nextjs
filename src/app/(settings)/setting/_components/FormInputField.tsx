import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { IFormField } from "@/types";

interface IProps {
  field: IFormField;
  form: any;
  isUpdating?: boolean;
  componentType?: string;
}
const FormInputField = ({ field, form, isUpdating, componentType }: IProps) => {
  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className="">
          <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
          <div
            className={`${
              componentType === "social"
                ? "flex flex-col md:flex-row md:items-center"
                : ""
            }`}
          >
            {componentType === "social" && (
              <div className="bg-secondary p-1 lg:rounded-l-md border">
                <span className="text-secondary-foreground text-sm">
                  http://www.{field.name}.com/
                </span>
              </div>
            )}
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  {...formField}
                  id={field.name}
                  disabled={isUpdating}
                  autoComplete={field.autoComplete}
                  aria-label={field.name}
                  placeholder={field.placeholder}
                  className={`resize-none`}
                />
              ) : (
                <Input
                  {...formField}
                  id={field.name}
                  type={field.type}
                  disabled={isUpdating}
                  autoComplete={field.autoComplete}
                  aria-label={field.name}
                  placeholder={field.placeholder}
                  readOnly={field.name === "email"}
                  className={`${field.name === "email" ? "bg-muted" : ""}  ${
                    componentType === "social" &&
                    "focus-visible:ring-0 rounded-l-none focus-visible:outline-none"
                  }`}
                />
              )}
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
