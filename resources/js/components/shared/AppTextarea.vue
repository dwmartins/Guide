<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        default: 3,
    },
    maxChars: {
        type: Number,
        required: true,
    },
    placeholder: {
        type: String,
        default: "",
    },
    modelValue: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue ?? '');

watch(
    () => props.modelValue,
    (newVal) => {
        inputValue.value = newVal;
    }
);

watch(inputValue, (newVal) => {
    emit("update:modelValue", newVal);
});

</script>

<template>
    <div class="custom-textarea">
        <textarea 
            :id="id"
            :rows="rows" 
            :maxlength="maxChars" 
            :placeholder="placeholder" 
            v-model="inputValue"
            class="form-control custom_focus text-secondary">
        </textarea>
        <div class="char-counter">
            {{ inputValue.length }} / {{ maxChars }}
        </div>
    </div>
</template>

<style scoped>
.custom-textarea {
    position: relative;
    width: 100%;
}

textarea.form-control {
    width: 100%;
    resize: vertical;
    font-size: 16px;
    padding: 10px;
    box-sizing: border-box;
}

.char-counter {
    text-align: right;
    font-size: 13px;
    color: #6c757d;
    margin-top: 5px;
}
</style>
