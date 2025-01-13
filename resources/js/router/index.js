import { createRouter, createWebHistory } from 'vue-router';
import { allowedRoles } from "@/helpers/constants";
import { showAlert } from "@/helpers/showAlert";
import SEOManager from "@/helpers/SEOManager";
import PublicLayout from '../layouts/PublicLayout.vue';
import HomeView from '../views/public/homeView.vue';
import PanelView from "@/views/public/user/PanelView.vue";
import { loadingPageStore } from '../store/loadingPageStore';
import { settingsStore } from "@/store/settingsStore";
import { siteInfoStore } from "@/store/siteInfoStore";
import { trans } from '../translation';
import AuthService from "@/services/AuthService";
import ProfileView from '../views/public/user/ProfileView.vue';

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
                },
                {
                    path: trans("PUBLIC_PATH_USER_PANEL"),
                    component: PanelView,
                    meta: { requiresAuth: true }
                },
                {
                    path: trans("PUBLIC_PATH_USER_PROFILE"),
                    component: ProfileView,
                    meta: { requiresAuth: true }
                },
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

    router.beforeEach((to, from, next) => {
        const { requiresAuth, requiresAuthAdmin } = to.meta;
        const isEnteringApp = to.path.startsWith('/app') && !from.path.startsWith('/app');
        const maintenanceMode = settingsStore.getSetting('maintenance') === "on";

        // checks if an imported component for better performance and adds a loader
        if(to.meta.isImport) {
            loadingPageStore.show();
        }

        // update SEO
        if(to.path.startsWith('/app')) {
            const SEOTitle = siteInfoStore.constants.webSiteName ? `${trans("SEO_TITLE_ADMIN_PANEL")} | ${siteInfoStore.constants.webSiteName}` : trans("SEO_TITLE_ADMIN_PANEL");
            SEOManager.setTitle(SEOTitle);
        } else {
            SEOManager.setAllMeta();
        }

        // Function that handles authentication and displays the loading screen
        const handleAuth = () => {
            loadingPageStore.show();
            return AuthService.auth()
                .finally(() => loadingPageStore.hide());
        };

        // Redirects to the maintenance page
        const redirectToMaintenance = () => {
            return next({ path: trans("PUBLIC_PATH_MAINTENANCE") });
        };

        // Redirects to the login page
        const redirectToLogin = () => {
            return next({
                path: trans("PUBLIC_PATH_LOGIN"),
                query: { redirect: to.path }
            });
        };

        // Redirects to the admin login page
        const redirectToLoginAdmin = () => {
            return next({ path: trans("ADMIN_PATH_LOGIN") });
        };

        // Checks if maintenance mode is enabled
        // Returns false if the user should be redirected to the maintenance page, interrupting navigation
        const checkMaintenanceMode = () => {
            const userLogged = AuthService.getUserLogged();
    
            // If the user is logged in and is a superuser, it does not enter maintenance mode
            if(userLogged && allowedRoles.includes(userLogged.role)) {
                return true;
            }
            
            // If maintenance mode is enabled and the user is not on allowed routes, redirect
            if (maintenanceMode && to.path !== trans("PUBLIC_PATH_MAINTENANCE") && !to.path.startsWith('/app') && to.path !== trans("ADMIN_PATH_LOGIN")) {
                redirectToMaintenance();
                return false;
            }
    
            return true;
        };

        // Checks if the user has the appropriate permission to access the route
        // Returns false and redirects to the home page if the user does not have permission
        const checkUserRole = (role) => {
            if (allowedRoles.includes(role)) {
                return true;
            } else {
                showAlert('error', '', trans("ACCESS_DENIED_MESSAGE"));
                redirectToLogin();
                return false;
            }
        };

        // Check maintenance mode before anything else
        if (!checkMaintenanceMode()) return;

        // Check if the route requires authentication
        if (requiresAuth) {
            handleAuth()
                .then(() => next())
                .catch(redirectToLogin);
        } else if (requiresAuthAdmin && isEnteringApp) {
            // Checks if the user is trying to enter the admin area and is authenticated
            handleAuth()
                .then(response => {
                    if (checkUserRole(response.data.userData.role)) {
                        next();
                    }
                })
                .catch(redirectToLoginAdmin);
        } else {
            next();
        }
    });

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