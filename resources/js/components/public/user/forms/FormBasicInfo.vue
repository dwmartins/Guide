<script setup>
import AppTextarea from '@/components/shared/AppTextarea.vue';
import BtnOutlinePrimary from '@/components/shared/buttons/BtnOutlinePrimary.vue';
import { trans } from '@/translation';
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    formBasicInfo: {
        type: Object,
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["submit"]);
const formBasicInfo = ref(props.formBasicInfo);
const onSubmit = () => {
    emit("submit", formBasicInfo.value);
}

</script>

<template>
    <form @submit.prevent="onSubmit()" class="row formBasicInfo mb-3">
        <div class="mb-3 col-12 col-md-4">
            <label for="name" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_NAME") }}</label>
            <input v-model="formBasicInfo.name" type="text" name="name" id="name" autocomplete="name" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="lastName" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_LAST_NAME") }}</label>
            <input v-model="formBasicInfo.lastName" type="text" name="lastName" id="lastName" autocomplete="lastName" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="dateOfBirth" class="text-secondary mb-2">{{ trans("LABEL_DATE_OF_BIRTH") }}</label>
            <input v-model="formBasicInfo.dateOfBirth" type="date" name="dateOfBirth" id="dateOfBirth" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-6">
            <label for="email" class="text-secondary mb-2"><span class="text-danger me-1">*</span>{{ trans("LABEL_EMAIL") }}</label>
            <input v-model="formBasicInfo.email" type="email" name="email" id="email" autocomplete="email" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-6">
            <label for="phone" class="text-secondary mb-2">{{ trans("LABEL_PHONE") }}</label>
            <input v-model="formBasicInfo.phone"  type="number" name="phone" id="phone" autocomplete="phone" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12">
            <label for="description" class="text-secondary mb-2">{{ trans("LABEL_USER_DESCRIPTION") }}</label>
            <AppTextarea
                id="description"
                :rows="5"
                :maxChars="300"
                :placeholder="trans('PLACEHOLDER_USER_DESCRIPTION')"
                v-model="formBasicInfo.description"
            />
        </div>

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