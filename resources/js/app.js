import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import loadApp from './loadApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import LoadingPage from './components/shared/LoadingPage.vue';
import { loadingPageStore } from './store/loadingPageStore';
import { settingsStore } from './store/settingsStore';
import { initializeRoutes } from './router';
import en from 'element-plus/es/locale/lang/en';
import ptBr from 'element-plus/es/locale/lang/pt-br';

axios.defaults.baseURL = "/api";

const loadingPage = createApp(LoadingPage);
loadingPage.mount("#loadingPage");
loadingPageStore.show();

function getElementPlusLocale() {
    const lang = settingsStore.getSetting('language') || 'pt-br';
    let locale;

    switch (lang) {
        case 'pt-br':
            locale = ptBr;
            break;
        case 'en-us':
            locale = en;
            break;
        default:
            locale = ptBr;
            break;
    }
    
    return locale;
}

async function startApp() {
    try {
        await loadApp();
        const router = initializeRoutes();

        const app = createApp(App);
        app.use(router);
        app.use(ElementPlus, { locale: getElementPlusLocale()} );
        app.mount("#app"); 

        loadingPageStore.hide();
        loadingPage.unmount('#loading');
    } catch (error) {
        loadingPageStore.hide();
        loadingPage.unmount('#loading'); 

        console.error("Error during app startup:", error);
    }
}

startApp();