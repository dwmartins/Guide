<script setup>
import FormAddress from '@/components/public/user/forms/FormAddress.vue';
import FormBasicInfo from '@/components/public/user/forms/FormBasicInfo.vue';
import FormDeleteAccount from '@/components/public/user/forms/FormDeleteAccount.vue';
import FormPassword from '@/components/public/user/forms/FormPassword.vue';
import FormSettings from '@/components/public/user/forms/FormSettings.vue';
import FormUpdatePhoto from '@/components/public/user/forms/FormUpdatePhoto.vue';
import { MIN_PASSWORD_LENGTH } from '@/helpers/constants';
import { simpleDate } from '@/helpers/dateHelper';
import SEOManager from '@/helpers/SEOManager';
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import { siteInfoStore } from '@/store/siteInfoStore';
import { userStore } from '@/store/userStore';
import { trans } from '@/translation';
import UserValidator from '@/validators/UserValidator';
import { computed, onBeforeMount, reactive, ref } from 'vue';

onBeforeMount(() => {
    const SEOTitle = siteInfoStore.constants.webSiteName ? `${trans("SEO_TITLE_USER_PROFILE")} | ${siteInfoStore.constants.webSiteName}` : trans("SEO_TITLE_USER_PROFILE");
    SEOManager.setTitle(SEOTitle);
});

const user = computed(() => userStore.user);

const isCollapsed = ref({
    basic_info: true,
    address: true,
    password: true,
    settings: true
});

const formBasicInfo = reactive({
    name: user.value.name,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
    description: user.value.description,
    dateOfBirth: user.value.dateOfBirth
});

const formAddress = reactive({
    address: user.value.address,
    complement: user.value.complement,
    city: user.value.city,
    zipCode: user.value.zipCode,
    state: user.value.state,
    country: user.value.country,
});

const formPassword = reactive({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
});

const formSettings = reactive({
    acceptsEmails: user.value.acceptsEmails === "Y" ? true : false,
    publishContactInfo: user.value.publishContactInfo === "Y" ? true : false,
});

let isLoading = ref({
    basic_info: false,
    address: false,
    settings: false,
    password: false,
    delete_account: false
});

const submitFormBasicInfo = async () => {
    const requiredFields = {
        name: { label: trans("LABEL_NAME"), required: true},
        lastName: { label: trans("LABEL_LAST_NAME"), required: true},
        email: { label: trans("LABEL_EMAIL"), required: true},
        phone: { label: trans("LABEL_PHONE"), required: false},
        description: { label: trans("LABEL_USER_DESCRIPTION"), required: false},
    }

    if(!UserValidator.validateForm(formBasicInfo, requiredFields)) {
        return;
    }

    try {
        showBtnLoading("basic_info");
        const response = await UserService.update(formBasicInfo);

        AuthService.updateUserLogged(response.data.userData);
        showAlert("success", "", response.data.message);
        hideBtnLoading("basic_info");
    } catch (error) {
        hideBtnLoading("basic_info");
        console.error('error updating user', error);
    }
}

const submitAddress = async () => {
    const requiredFields = {
        address: { label: trans("LABEL_ADDRESS"), required: false},
        complement: { label: trans("LABEL_COMPLEMENT"), required: false},
        city: { label: trans("LABEL_CITY"), required: false},
        zipCode: { label: trans("LABEL_ZIP_CODE"), required: false},
        state: { label: trans("LABEL_STATE"), required: false},
        country: { label: trans("LABEL_COUNTRY"), required: false},
    }

    if(!UserValidator.validateForm(formAddress, requiredFields)) {
        return;
    }

    try {
        showBtnLoading("address");
        const response = await UserService.updateAddress(formAddress);

        AuthService.updateUserLogged(response.data.userData);
        showAlert("success", "", response.data.message);
        hideBtnLoading("address");
    } catch (error) {
        hideBtnLoading("address");
        console.error('error updating user', error);
    }
}

const submitPassword = async () => {
    const requiredFields = {
        currentPassword: { label: trans("LABEL_CURRENT_PASSWORD"), required: true},
        newPassword: { label: trans("LABEL_NEW_PASSWORD"), required: true},
        confirmPassword: { label: trans("LABEL_CONFIRM_PASSWORD"), required: true}
    }

    if(!UserValidator.validateForm(formPassword, requiredFields)) {
        return;
    }

    if(formPassword.newPassword.length < MIN_PASSWORD_LENGTH || formPassword.confirmPassword.length < MIN_PASSWORD_LENGTH) {
        showAlert("warning", "", trans("PASSWORD_MIN_LENGTH_REQUIREMENT"));
        return;
    }

    if(formPassword.newPassword !== formPassword.confirmPassword) {
        showAlert("warning", "", trans("PASSWORD_NOT_MATCH_MESSAGE"));
        return;
    }

    try {
        showBtnLoading("password");
        const response = await UserService.updatePassword(formPassword);
        showAlert("success", "", response.data.message);
        hideBtnLoading("password");
    } catch (error) {
        hideBtnLoading("password");
        console.error('error updating user password', error);
    }
}

const submitSettings = async () => {
    try {
        showBtnLoading("settings");
        let settings = {...formSettings};

        for(const setting in settings) {
            settings[setting] = settings[setting] ? "Y" : "N";
        }

        const response = await UserService.updateSettings(settings);
        AuthService.updateUserLogged(response.data.userData);
        showAlert("success", "", response.data.message);
        
        hideBtnLoading("settings");
    } catch (error) {
        console.error('error updating user settings', error);
        hideBtnLoading("settings");
    }
}

const toggleCollapse = (section) => {
    isCollapsed.value[section] = !isCollapsed.value[section];
}

const beforeEnter = (el) => {
    el.style.maxHeight = '0';
    el.style.opacity = '0';
    el.style.overflow = 'hidden';
}

const enter = (el) => {
    el.offsetHeight;
    el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
}

const leave = (el) =>  {
    el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
    el.style.maxHeight = '0';
    el.style.opacity = '0';
}

const showBtnLoading = (btn) => {
    isLoading.value[btn] = true;
}

const hideBtnLoading = (btn) => {
    isLoading.value[btn] = false;
}

</script>
<template>
    <section class="profileView showPage">
        <div class="container my-3 my-sm-5">
            <h2 class="custom_dark fw-bolder">{{ trans('PERSONAL_INFO_TITLE') }}</h2>
            <p class="text-secondary">{{ trans('MANAGE_PERSONAL_HERE') }}</p>

            <div class="row mt-5">
                <div class="col-12 col-lg-7 col-xxl-6">
                    <FormUpdatePhoto />

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-4 custom_dark mb-0">{{ trans('BASIC_INFORMATION') }}</p>
                        <button @click="toggleCollapse('basic_info')"
                            class="btn btn-link fs-7 fw-semibold letter-spacing text-uppercase text-decoration-none">{{
                            trans('UPDATE') }}</button>
                    </div>

                    <div class="basic_info">
                        <p class="text-secondary fs-7 mb-0">
                            <i class="fa-regular fa-address-card me-2"></i>
                            {{ user.name }} {{ user.lastName }}
                        </p>
                        <p v-if="user.dateOfBirth" class="text-secondary fs-7 mb-0">
                            <i class="fa-solid fa-cake-candles me-2"></i>
                            {{ simpleDate(user.dateOfBirth) }}
                        </p>
                        <p class="text-secondary fs-7 mb-0">
                            <i class="fa-regular fa-envelope me-2"></i>
                            {{ user.email }}
                        </p>
                        <p v-if="user.phone" class="text-secondary fs-7 mb-0">
                            <i class="fa-solid fa-phone me-2"></i>
                            {{ user.phone }}
                        </p>
                    </div>

                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.basic_info" id="info_basic_form" class="container-fluid px-0 mt-3">
                            <FormBasicInfo
                                :formBasicInfo="formBasicInfo"
                                :isLoading="isLoading.basic_info"
                                @submit="submitFormBasicInfo()"
                            />
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-4 custom_dark mb-0">{{ trans('ADDRESS_TITLE_TITLE') }}</p>
                        <button @click="toggleCollapse('address')" class="btn btn-link fs-7 fw-semibold letter-spacing text-uppercase text-decoration-none">{{trans('UPDATE') }}</button>
                    </div>

                    <div class="mb-3">
                        <p v-if="user.address" class="text-secondary fs-7 mb-0">
                            <i class="fa-solid fa-location-dot me-2"></i>
                            {{ user.address }}
                        </p>
                        <p class="text-secondary fs-7 mb-0">
                            <template v-if="user.city">{{ user.city }}</template>
                            <template v-if="user.state">, {{ user.state }}</template>
                            <template v-if="user.zipCode">, {{ user.zipCode }}</template>
                        </p>
                    </div>

                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.address" id="address_form" class="container-fluid px-0 mt-2">
                            <FormAddress
                                :formAddress="formAddress"
                                :isLoading="isLoading.address"
                                @submit="submitAddress()"
                            />
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-5 custom_dark mb-0">{{ trans('PASSWORD_TITLE') }}</p>
                        <button @click="toggleCollapse('password')" class="btn btn-link fs-7 fw-semibold letter-spacing text-uppercase text-decoration-none">{{trans('UPDATE') }}</button>
                    </div>

                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.password" id="password_form" class="container-fluid px-0 mt-2">
                            <FormPassword
                                :formPassword="formPassword"
                                :isLoading="isLoading.password"
                                @submit="submitPassword()"
                            />
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-5 custom_dark mb-0">{{ trans('SETTINGS_TITLE') }}</p>
                        <button @click="toggleCollapse('settings')" class="btn btn-link fs-7 fw-semibold letter-spacing text-uppercase text-decoration-none">{{trans('UPDATE') }}</button>
                    </div>
                    
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.settings" id="settings_form" class="container-fluid px-0 mt-2">
                            <FormSettings
                                :formSettings="formSettings"
                                :isLoading="isLoading.settings"
                                @submit="submitSettings()"
                            />
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <FormDeleteAccount />
                </div>
                <div class="col-12 col-lg-5 col-xxl-6 p-3 pt-0 d-none d-lg-flex justify-content-center align-items-baseline">
                    <img class="w-100" src="@assets/svg/account.svg" :alt="trans('ALT_ACCOUNT')">
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.collapse-enter-active, .collapse-leave-active {
    transition: height 0.2s ease, opacity 0.2s ease;
}

.collapse-enter, .collapse-leave-to {
    height: 0;
    opacity: 0;
}
</style>