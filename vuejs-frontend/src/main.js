import { createApp } from 'vue'
import App from './App.vue'
import axiosInstance from './axios';
import store from './store';
import './assets/css/styles.css';
  
const app = createApp(App)

app.config.globalProperties.$axios = { ...axiosInstance }
app.use(store);
app.mount('#app')