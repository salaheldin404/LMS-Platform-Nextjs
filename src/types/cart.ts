import { ICourse } from "./course";

export type CartItem = {
  course: Omit<
    ICourse,
    "chapters" | "students" | "ratings" | "willLearn" | "requirements"
  >;
};

export interface Cart {
  _id: string;
  items: CartItem[];
  totalAmount: number;
}
