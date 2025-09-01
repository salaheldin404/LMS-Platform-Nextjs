import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartCourseItem } from "@/types/course";

interface WishlistState {
  items: CartCourseItem[]; // Using CartCourseItem for consistency, adjust if wishlist items have a different type
  itemCount: number;
}

const WISHLIST_STORAGE_KEY = "wishlist";

const loadWishlistFromStorage = (): CartCourseItem[] => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveWishlistItemsToStorage = (items: CartCourseItem[]): void => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Failed to save cart to localStorage:", error);
  }
};

// Initialize state with proper calculations
const initializeState = (): WishlistState => {
  const items = loadWishlistFromStorage();
  return {
    items,
    itemCount: items.length,
  };
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initializeState(),
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<CartCourseItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (!existingItem) {
        state.items.push(newItem);
        state.itemCount++;
        saveWishlistItemsToStorage(state.items);
      }
    },

    removeItemFromWishlist: (state, action: PayloadAction<string>) => {
      const itemIdToRemove = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item._id === itemIdToRemove
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.itemCount--;
        saveWishlistItemsToStorage(state.items);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      state.itemCount = 0;
      saveWishlistItemsToStorage([]);
    },
    moveToCart: (state, action: PayloadAction<CartCourseItem>) => {
      const itemIdToMove = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item._id === itemIdToMove._id
      );
      if (itemIndex !== -1) {
        state.itemCount--;
        state.items.splice(itemIndex, 1);
        saveWishlistItemsToStorage(state.items);
      }
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  clearWishlist,
  moveToCart,
} = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
