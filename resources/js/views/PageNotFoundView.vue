<template>
    <section class="pageNotFoundView container d-flex flex-column justify-content-center align-items-center vh-100 showPage">
        <img src="@assets/svg/pageNotFound.svg" alt="Page not found">
        <p class="text-secondary fs-4 text-center">{{ trans('PAGE_NOT_FOUND_MESSAGE') }}</p>
        <router-link to="/" class="btn btn-outline-primary">
            {{ trans('BUTTON_BACK_TO_HOME_PAGE') }}
        </router-link>
    </section>
</template>

<script setup>
import { trans } from '@/translation';

</script>

<style scoped>
img, p {
    max-width: 500px;
}
</style>