import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dish } from '@/db/schema';

export type Dish = typeof dish.$inferSelect;

export interface CartItem {
    dish: Dish;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (dish: Dish) => void;
    removeItem: (dishId: number) => void;
    updateQuantity: (dishId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (dish) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.dish.id === dish.id);

                if (existingItem) {
                    set({
                        items: currentItems.map(item =>
                            item.dish.id === dish.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({ items: [...currentItems, { dish, quantity: 1 }] });
                }
            },

            removeItem: (dishId) => {
                set({ items: get().items.filter(item => item.dish.id !== dishId) });
            },

            updateQuantity: (dishId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(dishId);
                    return;
                }

                set({
                    items: get().items.map(item =>
                        item.dish.id === dishId
                            ? { ...item, quantity }
                            : item
                    )
                });
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.dish.price * item.quantity), 0);
            }
        }),
        {
            name: 't20-cart-storage',
        }
    )
);
