import { createRouter, createWebHistory } from 'vue-router';
import PublicLayout from '../layouts/PublicLayout.vue';
import HomeView from '../views/public/homeView.vue';
import Login from '../views/admin/Login.vue';

const routes = [
    {
        path: "/",
        component: PublicLayout,
        children: [
            {
                path: "",
                component: HomeView
            }
        ]
    },
    {
        path: "/app/login",
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;