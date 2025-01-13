<script setup>
import BtnDanger from '@/components/shared/buttons/BtnDanger.vue';
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import { userStore } from '@/store/userStore';
import { trans } from '@/translation';
import { computed, ref } from 'vue';

const user = computed(() => userStore.user);
const confirmAccountDeletion = ref(false);
const isLoading = ref(false);

const onSubmit = async () => {
    if(!confirmAccountDeletion.value) {
        showAlert("warning", "", trans("ALERT_DELETE_ACCOUNT"));
        return;
    }

    try {
        isLoading.value = true;

        const response = await UserService.deleteAccount(user.value.id);
        showAlert('success', '', response.data.message);
        AuthService.logout();
        isLoading.value = false;
    } catch (error) {
        console.error('error deleting user account', error);
        isLoading.value = false;
    }
}
 
</script>

<template>
    <form @submit.prevent="onSubmit()" class="formDeleteAccount mt-5">
        <p class="fs-5 custom_dark mb-3">{{ trans("DELETE_ACCOUNT") }}</p>

        <div class="alert-danger alert border-0 d-flex flex-nowrap gap-4">
            <div>
                <i class="fa-solid fa-triangle-exclamation text-danger fs-1"></i>
            </div>
            <div>
                <p class="text-danger fw-semibold mb-0 fs-7">{{ trans("DELETE_ACCOUNT_TEXT") }}</p>
                <p class="text-danger mb-0 fs-7">{{ trans("ACTION_CANNOT_UNDONE") }}</p>
            </div>
        </div>

        <label for="confirmAccountDeletion" class="form-check-label text-secondary fs-7 mb-3 cursor_pointer">
            <input
                v-model="confirmAccountDeletion"
                type="checkbox"
                name="confirmAccountDeletion"
                class="form-check-input custom_focus"
                id="confirmAccountDeletion">
            {{ trans("CONFIRM_DELETE_ACCOUNT") }}
        </label>

        <div class="d-flex justify-content-end mt-3">
            <BtnDanger
                :text="trans('BUTTON_DELETE_ACCOUNT')"
                :loading="isLoading"
                type="submit"
                width="sm"
            />
        </div>
    </form>
</template>