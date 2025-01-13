<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: false
    }
});

defineEmits(['update:modelValue']);

</script>

<template>
    <input 
        class="switch" 
        name="emailActive" 
        id="emailActive" 
        type="checkbox" 
        :checked="props.modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    >
</template>

<style scoped>
.switch {
    position: relative;
    height: 1.4rem;
    width: 3rem;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    border-radius: 9999px;
    background-color: rgba(100, 116, 139, 0.377);
    transition: all .3s ease;
}

.switch:checked {
    background-color: var(--bs-primary);
}

.switch::before {
    position: absolute;
    content: "";
    left: calc(1.5rem - 1.6rem);
    top: calc(1.5rem - 1.6rem);
    display: block;
    height: 1.6rem;
    width: 1.6rem;
    cursor: pointer;
    border: 1px solid rgba(100, 116, 139, 0.527);
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 3px 10px rgba(100, 116, 139, 0.327);
    transition: all .3s ease;
}

.switch:checked:before {
    transform: translateX(100%);
    border-color: var(--bs-primary);
}
</style>