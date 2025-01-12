<script setup>
</script>

<template>
    <section class="position-relative m-0 p-0">
        <nav>
            <ul>
                <li><router-link to="/app/login">Login</router-link></li>
            </ul>
        </nav>
        <main>
            <router-view></router-view>
        </main>
    </section>
</template>