import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
    state: () => ({
        isCartOpen: false
    }),
    actions: {
        openCartModal() {
            this.isCartOpen = true;
        },

        closeCartModal() {
            this.isCartOpen = false;
        }
    }
});