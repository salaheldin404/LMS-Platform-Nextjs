import { CartCourseItem } from "@/types/course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartCourseItem[];
  total: number;
  itemCount: number;
}
const CART_STORAGE_KEY = "cart";

export const loadCartFromStorage = (): CartCourseItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear cart from localStorage:", error);
  }
};

const saveCartToStorage = (items: CartCourseItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Failed to save cart to localStorage:", error);
  }
};

// Calculate derived state
const calculateDerivedState = (items: CartCourseItem[]) => ({
  total: items.reduce((sum, item) => sum + (item.price || 0), 0),
  itemCount: items.length,
});

// Initialize state with proper calculations
const initializeState = (): CartState => {
  const items = loadCartFromStorage();
  return {
    items,
    ...calculateDerivedState(items),
  };
};

const initialState: CartState = initializeState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartCourseItem>) {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.items.push(action.payload);
        const derivedState = calculateDerivedState(state.items);
        state.total = derivedState.total;
        state.itemCount = derivedState.itemCount;
        saveCartToStorage(state.items);
      }
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
      const derivedState = calculateDerivedState(state.items);
      state.itemCount = derivedState.itemCount;
      state.total = derivedState.total;
      saveCartToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.itemCount = 0;
      state.total = 0;
      saveCartToStorage([]);
    },
    setCart(state, action: PayloadAction<CartCourseItem[]>) {
      state.items = action.payload.filter(
        (id, index, self) => self.indexOf(id) === index
      );
      const derivedState = calculateDerivedState(state.items);
      state.itemCount = derivedState.itemCount;
      state.total = derivedState.total;

      localStorage.setItem(CART_STORAGE_KEY, "[]");
    },
    moveToWishlist: (state, action: PayloadAction<CartCourseItem>) => {
      const itemIdToMove = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item._id === itemIdToMove._id
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        const derivedState = calculateDerivedState(state.items);
        state.itemCount = derivedState.itemCount;
        state.total = derivedState.total;
        saveCartToStorage(state.items);
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  moveToWishlist,
  setCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
