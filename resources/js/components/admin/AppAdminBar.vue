<script setup>
import { hasAccessToTheApp } from '@/helpers/constants';
import AuthService from '@/services/AuthService';
import { settingsStore } from '@/store/settingsStore';
import { userStore } from '@/store/userStore';
import { trans } from '@/translation';
import { computed } from 'vue';

const user = computed(() => userStore.user);

</script>

<template>
    <section v-if="hasAccessToTheApp.includes(user.role)" class="adminBarComponent position-sticky top-0 bg-dark">
        <div class="container py-2 d-flex align-items-center justify-content-between">
            <router-link :to="trans('ADMIN_PATH_DASHBOARD')" class="text-white-50 outline_none hover_primary">
                <i class="fa-solid fa-house me-1"></i>
                <span class="d-none d-sm-inline-block">{{ trans("DASHBOARD") }}</span>
            </router-link>

            <div v-if="settingsStore.maintenance == 'on'" class="item_center gap-2 publish">
                <p class="m-0 text-white-50 fs-7">{{ trans("SITE_UNDER_MAINTENANCE") }}</p>
                <a href="/app/configurações/configurações-gerais" class="btn btn-sm btn-outline-primary">{{ trans("BTN_TEXT_PUBLISH") }}</a>
            </div>

            <button type="button" class="btn text-white-50 p-0 hover_primary" @click="AuthService.logout(true)">
                <span class="d-none d-sm-inline-block">{{ trans("NAV_NAME_LOGOUT") }}</span>
                <i class="fa-solid fa-right-from-bracket ms-1"></i>
            </button>
        </div>
    </section>
</template>

<style scoped>
section {
    z-index: 99;
}

@media screen and (max-width: 360px) {
    .publish p {
        display: none;
    }
}
</style>