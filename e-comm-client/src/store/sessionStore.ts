import serverInstance from '@/config/api/serverInstance';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
    state: () => ({
        sessionId: Number(localStorage.getItem('sessionId')) || null
    }),

    actions: {
        setSessionId(id: number) {
            this.sessionId = id;
            localStorage.setItem('sessionId', id.toString());
        },

        clearSession() {
            this.sessionId = null;
            localStorage.removeItem('sessionId');
        },

        async initializeSession() {
            if (!this.sessionId) {
                try {
                    const res = await serverInstance.post('/sessions');
                    const { id_shopping_session } = res.data;
    
                    this.setSessionId(id_shopping_session);
                } catch (error) {
                    console.error("Could not initialize new session");
                }
            }
        }
    }
});