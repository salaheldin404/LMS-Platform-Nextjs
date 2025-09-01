import { ICourse } from "./course";

export type WishlistItem = {
  course: Omit<
    ICourse,
    "chapters" | "students" | "ratings" | "willLearn" | "requirements"
  >;
};

export interface Wishlist {
  _id: string;
  items: WishlistItem[];
}
