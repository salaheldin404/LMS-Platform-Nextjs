export interface IOption {
  label: string;
  value: string;
}
export type IFormField = {
  name: string;
  label?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "hidden"
    | "textarea";
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption;
  id?: string;
  defaultValue?: string;
  readOnly?: boolean;
  autoComplete?: string;
};

export interface PaginateResponse<T> {
  data: T[];
  pagination: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
  };
}
