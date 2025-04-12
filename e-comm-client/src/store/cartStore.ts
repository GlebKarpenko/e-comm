import { CartItem } from '@/views/cart-modal/types/cart.types';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        productItems: [] as CartItem[]
    }),

    getters: {
        totalQuantity: (state) => 
            state.productItems.reduce((total, item) => total + item.quantity, 0)
    },

    actions: {
        addItem(id: number, name: string) {
            const presentIndex = this.productItems.findIndex(item => item.id === id);
            if (presentIndex !== -1) {
                this.productItems[presentIndex].quantity += 1;
            } else {
                this.productItems.push({ id, name, quantity: 1 });
            }
        },

        removeItem(id: number) {
            const presentIndex = this.productItems.findIndex(item => item.id === id);
            if (presentIndex !== -1) {
                if (this.productItems[presentIndex].quantity === 1) {
                    this.productItems.splice(presentIndex, 1);
                } else {
                    this.productItems[presentIndex].quantity -= 1;
                }
            }
        },

        clearItem(id: number) {
            const presentIndex = this.productItems.findIndex(item => item.id === id);
            if (presentIndex !== -1) {
                this.productItems.splice(presentIndex, 1);
            }
        }
    }
});