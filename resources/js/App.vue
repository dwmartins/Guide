<template>
    <div id="app">
        <nav>
            <ul>
                <li><router-link to="/app/login">Login</router-link></li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script setup>
</script>

<style scoped>
#app {
    font-family: Arial, sans-serif;
    padding: 20px;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav li {
    display: inline;
    margin-right: 10px;
}

router-link {
    text-decoration: none;
    color: #409eff;
}

router-link:hover {
    color: #66b1ff;
}
</style>