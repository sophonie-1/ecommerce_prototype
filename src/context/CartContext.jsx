import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer for cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: state.totalPrice + action.payload.product.price * action.payload.quantity,
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + action.payload.quantity,
        totalPrice: state.totalPrice + action.payload.product.price * action.payload.quantity,
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      // Recalculate totals
      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return {
        ...state,
        items: updatedItems.filter((item) => item.quantity > 0), // Remove if 0
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter((item) => item.product.id !== action.payload.id);
      const removeTotalItems = state.items.reduce((sum, item) => item.product.id === action.payload.id ? sum - item.quantity : sum, 0);
      const removeTotalPrice = state.items.reduce((sum, item) => item.product.id === action.payload.id ? sum - (item.product.price * item.quantity) : sum, 0);
      return {
        ...state,
        items: filteredItems,
        totalItems: Math.max(0, state.totalItems + removeTotalItems), // Ensure non-negative
        totalPrice: Math.max(0, state.totalPrice + removeTotalPrice),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Optional: Persist to localStorage (uncomment if wanted)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};