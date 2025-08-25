// src/store/useShopStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useShopStore = create(
  persist(
    (set) => ({
      /* --------------- STATE --------------- */
      cart: [],
      orders: [],
      returns: [],

      /* --------------- CART --------------- */
      addToCart: product => {
        set(state => {
          const exists = state.cart.find(p => p.id === product.id);
          return {
            cart: exists
              ? state.cart.map(p =>
                  p.id === product.id
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
                )
              : [...state.cart, { ...product, quantity: 1 }],
          };
        });
      },
      updateQty: (id, qty) =>
        set(state => ({
          cart: state.cart
            .map(p => (p.id === id ? { ...p, quantity: qty } : p))
            .filter(p => p.quantity > 0),
        })),
      removeFromCart: id =>
        set(state => ({
          cart: state.cart.filter(p => p.id !== id),
        })),
      clearCart: () => set({ cart: [] }),

      /* --------------- ORDERS / RETURNS --------------- */
      addOrder: order => set(state => ({ orders: [...state.orders, order] })),
      updateOrder: updated =>
        set(state => ({
          orders: state.orders
            .map(o => (o.id === updated.id ? updated : o))
            .filter(o => o.items.length > 0),
        })),
      addReturn: ret => set(state => ({ returns: [...state.returns, ret] })),

    }),
    {
      name: 'shop-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
