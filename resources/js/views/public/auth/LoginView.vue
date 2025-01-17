<script setup>
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import { trans } from '@/translation';
import { onMounted, reactive, ref } from 'vue';
import BtnPrimary from '@/components/shared/buttons/BtnPrimary.vue';
import UserValidator from '@/validators/UserValidator';
import { useRouter } from 'vue-router';

const router = useRouter();
const redirect = ref("");

const isLoading = ref(false);

const formData = reactive({
    email: "",
    password: "",
    rememberMe: false
});

const showPassword = ref(false);

onMounted(() => {
    isLoggedIn();
    getQuery();
});

const getQuery = () => {
    const lastLogin = AuthService.getLastLogin();
    const emailFromQuery = router.query?.email;
    formData.email = emailFromQuery || lastLogin || "";

    redirect.value = router.query?.redirect || "";
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isLoggedIn = () => {
    if(AuthService.getUserLogged()) {
        showAlert("warning", "", trans("USER_ALREADY_LOGGED"));
        router.push("/");
    }
}

const isFieldEmpty = (event) => {
    const inputElement = event.target;

    if(!inputElement.value.trim()) {
        inputElement.classList.add("invalid-field");
    } else {
        inputElement.classList.remove('invalid-field');
    }
}

const submitForm = async () => {
    const requiredFields = {
        email: { label: trans("LABEL_EMAIL"), required: true},
        password: { label: trans("LABEL_PASSWORD"), required: true},
    }

    if(!UserValidator.validateForm(formData, requiredFields)) {
        return;
    }

    isLoading.value = true;

    try {
        const response = await AuthService.login(formData);
        isLoading.value = false;

        AuthService.setUserLogged(response.data, formData.rememberMe);
        showAlert('success', '', trans('LOGIN_SUCCESS_MESSAGE'));

        router.push(redirect.value || "/");

    } catch (error) {
        isLoading.value = false;
        console.error('Error logging in', error);
    }
}

</script>

<template>
    <section class="loginView container d-flex align-items-center showPage">
        <div class="row m-0 w-100">
            <div class="col-sm-12 col-md-6 col-xl-7 d-flex flex-column justify-content-center align-items-center">
                <h4 class="custom_dark">{{ trans("LOGIN_TITLE") }}</h4>

                <form @submit.prevent="submitForm()" class="w-100 form_login">
                    <div class="mb-3">
                        <label for="email" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_EMAIL") }}</label>
                        <input v-model="formData.email" @blur="isFieldEmpty($event)" type="email" name="email" id="email" autocomplete="email" class="form-control custom_focus text-secondary">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_PASSWORD") }}</label>
                        <div class="position-relative">
                            <input v-model="formData.password" @blur="isFieldEmpty($event)" :type="showPassword ? 'text' : 'password'" name="password" id="password" class="form-control custom_focus text-secondary">
                            <i v-if="formData.password" @click="togglePasswordVisibility()" class="icon_show_password" :class="showPassword ? 'fa-regular fa-eye-slash text-secondary' : 'fa-regular fa-eye text-secondary'"></i>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center gap-1 mb-3">
                        <label for="rememberMe" class="form-check-label text-secondary fs-7 cursor_pointer">
                            <input v-model="formData.rememberMe" type="checkbox" name="rememberMe" class="form-check-input custom_focus" id="rememberMe">
                            {{ trans("REMEMBER_ME") }}
                        </label>
                        <router-link :to="trans('PUBLIC_PATH_FORGOT_PASSWORD')" class="outline_none text-primary fs-7e">
                            {{ trans("FORGOT_MY_PASSWORD") }}
                        </router-link>
                    </div>

                    <BtnPrimary 
                        class="w-100"
                        :text="trans('BUTTON_ENTER')"
                        ico="fa-solid fa-arrow-right-to-bracket"
                        :loading="isLoading"
                        type="submit"
                    />
                    <hr class="text-secondary">

                    <p class="text-secondary text-center">
                        {{ trans("DONT_HAVE_ACCOUNT") }}
                        <router-link :to="trans('PUBLIC_PATH_REGISTER')" class="text-primary outline_none">
                            {{ trans("CREATE_MY_ACCOUNT") }}
                        </router-link>
                    </p>
                </form>
            </div>
            <div class="col-md-6 col-xl-5 d-none d-md-flex justify-content-center align-items-center">
                <img class="w-100" src="@assets/svg/login.svg" alt="login">
            </div>
        </div>
    </section>
</template>

<style scoped>
.loginView {
    height: calc(100vh - 130px);
}

.form_login {
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

    .new_account, a {
        text-align: center;
        font-size: 0.8rem;
    }
}
</style>