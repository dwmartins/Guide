<script setup>
const logout = () => {
    localStorage.removeItem('auth_token');
    alert("Saiu!");
}
</script>

<template>
    <div class="dashboard">
        <h1>Bem-vindo ao Dashboard!</h1>
        <button @click="logout">Sair</button>
    </div>
</template>

<style scoped>
.dashboard {
    padding: 20px;
}
</style>