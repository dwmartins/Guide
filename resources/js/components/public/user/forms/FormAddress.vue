<script setup>
import BtnOutlinePrimary from '@/components/shared/buttons/BtnOutlinePrimary.vue';
import { trans } from '@/translation';
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    formAddress: {
        type: Object,
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["submit"]);
const formAddress = ref(props.formAddress);
const onSubmit = () => {
    emit("submit", formAddress.value);
}

</script>

<template>
    <form @submit.prevent="onSubmit()" class="row formUserAddress mb-3">
        <div class="mb-3 col-12 col-md-6">
            <label for="address" class="text-secondary mb-2">{{ trans("LABEL_ADDRESS") }}</label>
            <input v-model="formAddress.address" type="text" name="address" id="address" autocomplete="address" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-3">
            <label for="complement" class="text-secondary mb-2">{{ trans("LABEL_COMPLEMENT") }}</label>
            <input v-model="formAddress.complement" type="text" name="complement" id="complement" autocomplete="complement" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-3">
            <label for="city" class="text-secondary mb-2">{{ trans("LABEL_CITY") }}</label>
            <input v-model="formAddress.city" type="text" name="city" id="city" autocomplete="city" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="zipCode" class="text-secondary mb-2">{{ trans("LABEL_ZIP_CODE") }}</label>
            <input v-model="formAddress.zipCode" type="number" name="zipCode" id="zipCode" autocomplete="zipCode" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="state" class="text-secondary mb-2">{{ trans("LABEL_STATE") }}</label>
            <input v-model="formAddress.state" type="text" name="state" id="state" autocomplete="state" class="form-control custom_focus text-secondary">
        </div>
        <div class="mb-3 col-12 col-md-4">
            <label for="country" class="text-secondary mb-2">{{ trans("LABEL_COUNTRY") }}</label>
            <input v-model="formAddress.country" type="text" name="country" id="country" autocomplete="country" class="form-control custom_focus text-secondary">
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

<style scoped>
</style>