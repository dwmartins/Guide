<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
    try {
        const response = await axios.post("/auth/login", {
            email: email.value,
            password: password.value
        });

        alert("OK");
        
    } catch (error) {
        errorMessage.value = error.response.data.error || "Erro desconhecido";
    }
}
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
            </div>

            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #66b1ff;
}

.error {
    color: red;
    margin-top: 1rem;
}
</style>