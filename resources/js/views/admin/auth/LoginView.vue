<script setup>
import { reactive, ref } from 'vue';
import BtnPrimary from '@/components/shared/buttons/BtnPrimary.vue';
import { trans } from '@/translation.js';
import UserValidator from '@/validators/UserValidator';
import AuthService from '@/services/AuthService';
import { showAlert } from '@/helpers/showAlert';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
    email: "",
    password: "",
    rememberMe: false
});

const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const isFieldEmpty = (event) => {
    const inputElement = event.target;

    if(!inputElement.value.trim()) {
        inputElement.classList.add("invalid-field");
    } else {
        inputElement.classList.remove('invalid-field');
    }
}

const handleLogin = async () => {
    try {
        const requiredFields = {
            email: { label: trans("LABEL_EMAIL"), required: true},
            password: { label: trans("LABEL_PASSWORD"), required: true},
        }

        if(!UserValidator.validateForm(formData, requiredFields)) {
            return;
        }

        isLoading.value = true;
        
        const response = await AuthService.AdminLogin(formData);
        isLoading.value = false;

        AuthService.setUserLogged(response.data, formData.rememberMe);
        showAlert("success", "", trans("LOGIN_SUCCESS_MESSAGE"));
        router.push("/app");
        
    } catch (error) {
        isLoading.value = false;
        console.error("Error logging in", error);
    }
}
</script>

<template>
    <section class="loginView container item_center ">
        <form @submit.prevent="handleLogin()">
            <h3 class="text-center text-secondary">{{ trans('PANEL_PAGE_TITLE') }}</h3>
            
            <div class="mb-3">
                <label for="email" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_EMAIL") }}</label>
                <input v-model="formData.email" @blur="isFieldEmpty($event)" type="email" name="email" id="email" autocomplete="email" class="form-control custom_focus text-secondary">
            </div>

            <div class="mb-3">
                <label for="password" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_PASSWORD") }}</label>
                <div class="position-relative">
                    <input v-model="formData.password" @blur="isFieldEmpty($event)" :type="showPassword ? 'text' : 'password'" name="password" id="password" class="form-control custom_focus text-secondary">
                    <i v-if="formData.password"  @click="togglePasswordVisibility()" class="icon_show_password" :class="showPassword ? 'fa-regular fa-eye-slash text-secondary' : 'fa-regular fa-eye text-secondary'"></i>
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center gap-1 mb-3">
                <label for="rememberMe" class="form-check-label text-secondary fs-7 cursor_pointer">
                    <input type="checkbox" name="rememberMe" class="form-check-input custom_focus" id="rememberMe">
                    {{ trans("REMEMBER_ME") }}
                </label>
                <router-link to="/" class="outline_none text-primary fs-7e">
                    {{ trans("FORGOT_MY_PASSWORD") }}
                </router-link>
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

@media screen and (max-width: 342px) {
    .rememberMe {
        justify-content: center !important;
    }
}
</style>