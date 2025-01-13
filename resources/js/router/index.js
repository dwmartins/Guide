import { createRouter, createWebHistory } from 'vue-router';
import PublicLayout from '../layouts/PublicLayout.vue';
import HomeView from '../views/public/homeView.vue';
import { loadingPageStore } from '../store/loadingPageStore';
import { trans } from '../translation';

let router = null;

export function initializeRoutes() {
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
            path: trans("ADMIN_PATH_LOGIN"),
            component: () => import("@/views/admin/auth/LoginView.vue")
        },
        {
            path: trans("PUBLIC_PATH_PAGE_NOT_FOUND"),
            component: () => import("@/views/PageNotFoundView.vue"),
            meta: { isImport: true }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: trans("PUBLIC_PATH_PAGE_NOT_FOUND")
        },
    ];

    router = createRouter({
        history: createWebHistory(),
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
              return savedPosition;
            } else {
              return { top: 0 };
            }
        }
    });

    router.afterEach(() => {
        loadingPageStore.hide()
    });

    return router;  
}

export { router };