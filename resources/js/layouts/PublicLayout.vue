<script setup>
import AppHeader from '../components/public/AppHeader.vue';

</script>

<template>
    <section class="publicLayout position-relative m-0 p-0">
        <AppHeader/>
        <main>
            <router-view></router-view>
        </main>
    </section>
</template>