import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Helper: Recalculate totals from items (ensures consistency)
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Reducer (added recalculate in LOAD_CART)
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      const { items, totalItems: savedTotalItems, totalPrice: savedTotalPrice } = action.payload;
      // Recalculate to ensure accuracy (override saved totals if drifted)
      const { totalItems: calcItems, totalPrice: calcPrice } = calculateTotals(items);
      console.log('Loaded cart:', { items: items.length, calcItems, calcPrice, savedTotalItems, savedTotalPrice }); // Debug: Check on load
      return {
        ...state,
        items,
        totalItems: calcItems, // Use calculated
        totalPrice: calcPrice, // Use calculated
      };
    case 'ADD_ITEM':
      const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
      let newState;
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      const { totalItems, totalPrice } = calculateTotals(newState.items);
      return { ...newState, totalItems, totalPrice };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter((item) => item.quantity > 0); // Remove if 0
      const { totalItems: newTotalItems, totalPrice: newTotalPrice } = calculateTotals(updatedItems);
      return {
        ...state,
        items: updatedItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter((item) => item.product.id !== action.payload.id);
      const { totalItems: removeTotalItems, totalPrice: removeTotalPrice } = calculateTotals(filteredItems);
      return {
        ...state,
        items: filteredItems,
        totalItems: removeTotalItems,
        totalPrice: removeTotalPrice,
      };
    case 'CLEAR_CART':
      console.log('Cart cleared - removing from localStorage'); // Debug
      return initialState;
    default:
      return state;
  }
};

// Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save to localStorage on state change (skip if empty)
  useEffect(() => {
    if (state.items.length === 0) return; // Don't save empty state
    try {
      localStorage.setItem('marz-cart', JSON.stringify(state));
      console.log('Cart saved to localStorage:', state); // Debug: Confirm save
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('marz-cart');
      if (saved) {
        const parsedState = JSON.parse(saved);
        if (parsedState.items && parsedState.items.length > 0) {
          dispatch({ type: 'LOAD_CART', payload: parsedState });
          console.log('Restored cart from localStorage'); // Debug: Confirm load
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem('marz-cart'); // Clear corrupted data
    }
  }, []); // Run once on mount

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