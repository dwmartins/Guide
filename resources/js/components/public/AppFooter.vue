<script setup>
import { DEFAULT_LOGO, SYSTEM_IMAGE_PATH } from '@/helpers/constants';
import { siteInfoStore } from '@/store/siteInfoStore';
import { trans } from '@/translation';
import { computed } from 'vue';

const logo = computed(() => siteInfoStore.constants.logoImage ? `${SYSTEM_IMAGE_PATH}/${siteInfoStore.constants.logoImage}` : DEFAULT_LOGO);

const urls = {
    twitter: siteInfoStore.constants.twitter,
    facebook: siteInfoStore.constants.facebook,
    instagram: siteInfoStore.constants.instagram
}

const showSocialMedia = () => {
    const siteInfo = siteInfoStore.constants;

    if(siteInfo.facebook || siteInfo.instagram || siteInfo.twitter) {
        return true;
    }
}

</script>

<template>
    <footer class="bg-body-tertiary">
        <div class="container py-5">
            <div class="row">
                <div class="col-12 col-sm-4 logo_footer py-2">
                    <div class="h-100 w-100 d-flex flex-column justify-content-center text-center">
                        <a class="navbar-brand" href="#">
                            <div class="logo_image d-flex align-items-center justify-content-center">
                                <router-link to="/" class="navbar-brand">
                                    <div class="d-flex align-items-center logo_image">
                                        <img :src="logo" alt="logo">
                                    </div>
                                </router-link>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-12" :class="showSocialMedia() ? 'col-sm-4' : 'col-sm-8'">
                    <div class="p-2">
                        <h4 class="text-dark fs-5">{{ trans('NAVIGATION_TITLE') }}</h4>

                        <div class="row align">
                            <ul class="navbar-nav col px-3">
                                <li class="nav-item">
                                    <router-link to="/" class="nav-link">
                                        {{ trans('NAV_NAME_HOME') }}
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="trans('PUBLIC_PATH_LISTINGS')" class="nav-link">
                                        {{ trans('NAV_NAME_LISTINGS') }}
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="trans('PUBLIC_PATH_EVENTS')" class="nav-link">
                                        {{ trans('NAV_NAME_EVENTS') }}
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="navbar-nav col px-3">
                                <li class="nav-item">
                                    <router-link :to="trans('PUBLIC_PATH_BLOG')" class="nav-link">
                                        {{ trans('NAV_NAME_BLOG') }}
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="trans('PUBLIC_PATH_CONTACT')" class="nav-link">
                                        {{ trans('NAV_NAME_CONTACT') }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="text-secondary d-sm-none">
                <div class="col-12 col-sm-4 socialMedia" v-if="showSocialMedia()">
                    <div class="p-2">
                        <h4 class="text-dark text-center fs-5">{{ trans('SOCIAL_MEDIA_TITLE') }}</h4>
                        <div class="d-flex gap-3 justify-content-center p-2">
                            <a v-if="urls.twitter" :href="urls.twitter" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-x-twitter text-dark fs-4"></i>
                            </a>
                            <a v-if="urls.facebook" :href="urls.facebook" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-facebook text-dark fs-4"></i>
                            </a>
                            <a v-if="urls.instagram" :href="urls.instagram" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-instagram text-dark fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid gap-3 bg-dark bg-opacity-75 p-3">
            <div class="container">
                <div class="row">
                    <p class="col-12 col-sm-6 text-light m-0 fs-7 text-center mb-2 mb-sm-0">{{ trans('DEVELOPER_CREDIT_TEXT') }}:
                        <a href="https://br.linkedin.com/in/douglas-martins-a36a45185" target="_blank" rel="noopener noreferrer" class="text-white link-offset-2 link-underline link-underline-opacity-0 opacity-75">Douglas Wellington
                            Martins
                        </a>
                    </p>
                    <p class="col-12 col-sm-6 text-light m-0 fs-7 text-center">
                        {{ trans('ILLUSTRATION_CREDIT_TEXT') }}:
                        <a href="https://storyset.com" target="_blank" rel="noopener noreferrer" class="text-white link-offset-2 link-underline link-underline-opacity-0 opacity-75">{{ trans('STORYSET') }}</a> 
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.logo_image img{
    width: 100%;
    max-width: 200px;
    max-height: 100px;
}

@media screen and (max-width: 390px) {
    .logo_footer {
        min-width: 200px;
        width: 100%;
    }
}

.navbar-nav .nav-item:hover {
    font-weight: 600;
    transition: 0.2s;
}
</style>