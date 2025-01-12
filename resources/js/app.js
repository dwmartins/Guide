import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

axios.defaults.baseURL = "/api";

const app = createApp(App);

app.use(router);

app.mount('#app');
