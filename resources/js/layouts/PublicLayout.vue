<script setup>
import AppAdminBar from '../components/admin/AppAdminBar.vue';
import AppFooter from '../components/public/AppFooter.vue';
import AppHeader from '../components/public/AppHeader.vue';

</script>

<template>
    <section class="publicLayout position-relative m-0 p-0">
        <AppAdminBar/>
        <AppHeader/>
        <main>
            <router-view></router-view>
        </main>
        <AppFooter/>
    </section>
</template>