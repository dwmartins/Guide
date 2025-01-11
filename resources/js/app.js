import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router'

axios.defaults.baseURL = "/api";

const app = createApp(App);

app.use(router);

app.mount('#app');
