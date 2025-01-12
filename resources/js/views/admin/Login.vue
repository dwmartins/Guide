<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import BtnPrimary from '@/components/shared/buttons/BtnPrimary.vue';

const email = ref("");
const password = ref("");

const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const fields = reactive({
    title: "Painel",
    buttonText: "Entrar"
})

const updateText = (field, value) => {
    alert("Deseja alterar o texto?");
    fields[field] = value;
}

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
    <section class="loginView container item_center ">
        <form @submit.prevent="handleLogin()">
            <h3 class="text-center text-primary">Painel</h3>
            
            <div class="mb-3">
                <label for="email" class="text-secondary mb-2"><span class="text-danger me-1">*</span>E-mail</label>
                <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="form-control custom_focus text-secondary">
            </div>

            <div class="mb-3">
                <label for="password" class="text-secondary mb-2"><span class="text-danger me-1">*</span>Senha</label>
                <div class="position-relative">
                    <input v-model="password" :type="showPassword ? 'text' : 'password'" name="password" id="password" class="form-control custom_focus text-secondary">
                    <i v-if="password" @click="togglePasswordVisibility()" class="icon_show_password" :class="showPassword ? 'fa-regular fa-eye-slash text-secondary' : 'fa-regular fa-eye text-secondary'"></i>
                </div>
            </div>

            <BtnPrimary
                class="w-100"
                text="Entrar"
                ico="fa-solid fa-arrow-right-to-bracket"
                :loading="isLoading"
                type="submit"
            />
        </form>
    </section>
</template>

<style scoped>
.loginView {
    height: 100vh;
}

.loginView form {
    width: 100%;
    max-width: 400px;
}

.icon_show_password {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
}
</style>