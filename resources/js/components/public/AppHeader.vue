<script setup>
import { computed } from 'vue';
import { trans } from '@/translation';
import { userStore } from '@/store/userStore';
import { siteInfoStore } from '@/store/siteInfoStore';
import AuthService from '@/services/AuthService';
import { allowedRoles, DEFAULT_LOGO, SYSTEM_IMAGE_PATH } from '@/helpers/constants';

const user = computed(() => userStore.user);

const logoImage = computed(() => siteInfoStore.constants.logoImage ? `${SYSTEM_IMAGE_PATH}/${siteInfoStore.constants.logoImage}` : DEFAULT_LOGO);

const closeNavbar = () => {
    const navBar = document.getElementById('navBar');

    if (navBar.classList.contains('show')) {
        navBar.classList.remove('show');
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mx-0 p-0 py-2">
        <div class="container">
            <router-link to="/" class="navbar-brand" @click="closeNavbar()">
                <div class="d-flex align-items-center logo_image">
                    <img :src="logoImage" alt="Logo">
                </div>
            </router-link>

            <button @click="menuOnClick" class="btn border-0 navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navBar" aria-controls="navBar" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navBar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <!-- Logged -->
                    <div v-if="userStore.userLogged">
                        <li class="nav-item logged_small">
                            <i class="bi bi-person-fill me-1 "></i>
                            <p class="m-0 text-secondary"><i class="fa-regular fa-user me-2"></i>{{ userStore.user.name
                                }} {{ userStore.user.lastName }}</p>
                        </li>

                        <hr>

                        <li v-if="allowedRoles.includes(user.role)" class="nav-item logged_small">
                            <router-link :to="trans('PUBLIC_PATH_USER_PANEL')" class="nav-link" @click="closeNavbar()">
                                {{ trans('NAV_NAME_PANEL') }}
                            </router-link>
                        </li>
                        <li class="nav-item logged_small">
                            <router-link :to="trans('PUBLIC_PATH_USER_PROFILE')" class="nav-link" @click="closeNavbar()">
                                {{ trans('NAV_NAME_PROFILE') }}
                            </router-link>
                        </li>
                        <li class="nav-item logged_small">
                            <span class="nav-link cursor_pointer" @click="closeNavbar(), AuthService.logout(true)">{{
                                trans('NAV_NAME_LOGOUT') }}</span>
                        </li>
                    </div>
                    <!-- Logged -->
                    <hr>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_HOME') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="trans('PUBLIC_PATH_LISTINGS')" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_LISTINGS') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="trans('PUBLIC_PATH_EVENTS')" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_EVENTS') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="trans('PUBLIC_PATH_BLOG')" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_BLOG') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="trans('PUBLIC_PATH_CONTACT')" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_CONTACT') }}
                        </router-link>
                    </li>
                    <hr>
                    <li class="nav-item logged_small">
                        <router-link :to="trans('PUBLIC_PATH_PLANS')" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_PLANS') }}
                        </router-link>
                    </li>

                    <hr v-if="!userStore.userLogged">
                    <!-- not logged in -->
                    <li v-if="!userStore.userLogged" class="nav-item logged_small">
                        <router-link :to="trans('PUBLIC_PATH_LOGIN')" class="nav-link" @click="closeNavbar()">
                            {{ trans('NAV_NAME_LOGIN') }}
                        </router-link>
                    </li>
                    <!-- not logged in -->

                </ul>
                <div v-if="userStore.userLogged" class="logged_large">
                    <button class="btn btn-light border btn-sm me-2 fw-semibold text-dark opacity-75">
                        <router-link :to="trans('PUBLIC_PATH_PLANS')" class="nav-link">
                            {{ trans('BUTTON_ADVERTISE_HERE') }}
                        </router-link>
                    </button>

                    <div class="dropdown">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ userStore.user.name }}
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link :to="trans('PUBLIC_PATH_USER_PANEL')" class="dropdown-item px-3 w-100 text-secondary">
                                    <i class="fa-solid fa-chart-line me-2"></i>
                                    {{ trans('NAV_NAME_PANEL') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="trans('PUBLIC_PATH_USER_PROFILE')" class="dropdown-item px-3 w-100 text-secondary">
                                    <i class="fa-regular fa-user me-2"></i>
                                    {{ trans('NAV_NAME_PROFILE') }}
                                </router-link>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <span @click="AuthService.logout(true)" class="dropdown-item px-3 w-100 cursor_pointer text-secondary">
                                    <i class="fa-solid fa-right-from-bracket me-2"></i>
                                    {{ trans('NAV_NAME_LOGOUT') }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="!userStore.userLogged" class="flex logged_large">
                    <router-link :to="trans('PUBLIC_PATH_PLANS')"
                        class="btn btn-light border btn-sm me-2 fw-semibold text-dark opacity-75"
                        @click="closeNavbar()">
                        {{ trans('BUTTON_ADVERTISE_HERE') }}
                    </router-link>

                    <router-link :to="trans('PUBLIC_PATH_LOGIN')" class="btn btn-primary btn-sm fw-semibold rounded-1"
                        @click="closeNavbar()">
                        {{ trans('NAV_NAME_LOGIN') }}
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-toggler:focus {
    box-shadow: none;
}

nav {
    box-shadow: 0 0 1rem rgba(0, 0, 0, .15) !important;
}

.logo_image {
    max-width: 200px;
    max-height: 100px;
}

.logo_image img {
    max-width: 200px;
    max-height: 100px;
    object-fit: contain;
}

.logged_small {
    display: none;
}

.logged_large {
    display: flex;
}

.dropdown-menu {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    border: 0 !important;
}

.dropdown-item:hover {
    background-color: #d8ebfd;
    color: #409EFF !important;
}

@media screen and (max-width: 992px) {
    .logged_small {
        display: flex;
    }

    .logged_large {
        display: none;
    }

    .logo_image {
        max-width: 180px;
        max-height: 180px;
    }
}

.fa-bars {
    font-size: 25px !important;
}

@media screen and (max-width: 576px) {
    li {
        font-size: 18px;
    }
}
</style>