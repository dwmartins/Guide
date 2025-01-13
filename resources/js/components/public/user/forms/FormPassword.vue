<script setup>
import BtnOutlinePrimary from '@/components/shared/buttons/BtnOutlinePrimary.vue';
import { trans } from '@/translation';
import { defineProps, defineEmits, ref, reactive } from 'vue';

const props = defineProps({
    formPassword: {
        type: Object,
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["submit"]);
const formPassword = ref(props.formPassword);
const onSubmit = () => {
    emit("submit", formPassword.value);
}

const showPassword = reactive({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
});

const togglePasswordVisibility = (field) => {
    showPassword[field] = !showPassword[field];
};

const isFieldEmpty = (event) => {
    const inputElement = event.target;

    if(!inputElement.value.trim()) {
        inputElement.classList.add("invalid-field");
    } else {
        inputElement.classList.remove('invalid-field');
    }
}

</script>

<template>
    <form @submit.prevent="onSubmit()" class="row formPassword mb-3">
        <div class="mb-3 col-12 col-md-4">
            <label for="currentPassword" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_CURRENT_PASSWORD") }}</label>
            <div class="position-relative">
                <input v-model="formPassword.currentPassword" @blur="isFieldEmpty($event)" :type="showPassword.currentPassword ? 'text' : 'password'" name="currentPassword" id="currentPassword" class="form-control custom_focus text-secondary">
                <i v-if="formPassword.currentPassword" @click="togglePasswordVisibility('currentPassword')" class="icon_show_password" :class="showPassword.currentPassword ? 'fa-regular fa-eye-slash text-secondary' : 'fa-regular fa-eye text-secondary'"></i>
            </div>
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="newPassword" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_NEW_PASSWORD") }}</label>
            <div class="position-relative">
                <input v-model="formPassword.newPassword" @blur="isFieldEmpty($event)" :type="showPassword.newPassword ? 'text' : 'password'" name="newPassword" id="newPassword" class="form-control custom_focus text-secondary">
                <i v-if="formPassword.newPassword" @click="togglePasswordVisibility('newPassword')" class="icon_show_password" :class="showPassword.newPassword ? 'fa-regular fa-eye-slash text-secondary' : 'fa-regular fa-eye text-secondary'"></i>
            </div>
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="confirmPassword" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_CONFIRM_PASSWORD") }}</label>
            <div class="position-relative">
                <input v-model="formPassword.confirmPassword" @blur="isFieldEmpty($event)" :type="showPassword.confirmPassword ? 'text' : 'password'" name="confirmPassword" id="confirmPassword" class="form-control custom_focus text-secondary">
                <i v-if="formPassword.confirmPassword" @click="togglePasswordVisibility('confirmPassword')" class="icon_show_password" :class="showPassword.confirmPassword ? 'fa-regular fa-eye-slash text-secondary' : 'fa-regular fa-eye text-secondary'"></i>
            </div>
        </div>

        <p class="text-secondary fs-7 my-0">{{ trans("PASSWORD_MIN_LENGTH_REQUIREMENT") }}</p>

        <div class="d-flex justify-content-end mt-3">
            <BtnOutlinePrimary
                :text="trans('BUTTON_SAVE_CHANGES')"
                :loading="isLoading"
                type="submit"
                width="sm"
            />
        </div>
    </form>
</template>

<style scoped>
.icon_show_password {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
}
</style>