import { createStore } from 'vuex';
import axiosInstance from './axios';

const store = createStore({
    state: {
        token: localStorage.getItem('authToken') || null,
        user: JSON.parse(localStorage.getItem('userData')) || null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        clearAuth(state) {
            state.token = null;
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, { token, user }) {
            commit('setToken', token);
            commit('setUser', user);
            // Save token and user data to localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
            // Update axiosInstance headers with token
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        async logout({ commit, state }) {
            try {
                await axiosInstance.post('/api/logout', null, {
                    headers: {
                    Authorization: `Bearer ${state.token}`,
                    },
                });
                commit('clearAuth');
                // Clear token and user data from localStorage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                delete axiosInstance.defaults.headers.common['Authorization'];
            } catch (error) {
                console.error('Error during logout:', error);
            }
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        getUser(state) {
            return state.user;
        },
    },
});

export default store;