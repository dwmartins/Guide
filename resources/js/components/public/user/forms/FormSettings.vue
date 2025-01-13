<script setup>
import BtnOutlinePrimary from '@/components/shared/buttons/BtnOutlinePrimary.vue';
import { trans } from '@/translation';
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    formSettings: {
        type: Object,
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["submit"]);
const formSettings = ref(props.formSettings);
const onSubmit = () => {
    emit("submit", formSettings.value);
}

</script>

<template>
    <form @submit.prevent="onSubmit()" class="mb-3 formSettings">
        <label for="acceptsEmails" class="form-check-label text-secondary fs-7 mb-3 cursor_pointer">
            <input
                v-model="formSettings.acceptsEmails"
                :checked="formSettings.acceptsEmails"
                type="checkbox"
                name="acceptsEmails"
                class="form-check-input custom_focus"
                id="acceptsEmails"
            >
            {{ trans("AGREE_RECEIVE_MAIL") }}
        </label>

        <label for="publishContactInfo" class="form-check-label text-secondary fs-7 mb-3 cursor_pointer">
            <input
                v-model="formSettings.publishContactInfo"
                :checked="formSettings.publishContactInfo"
                type="checkbox"
                name="publishContactInfo"
                class="form-check-input custom_focus"
                id="publishContactInfo"
            >
            {{ trans("CONTACT_PUBLIC") }}
        </label>

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