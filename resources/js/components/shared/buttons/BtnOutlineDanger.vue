<script setup>
import { trans } from '@/translation';
import { computed, defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: false,
        default: () => trans("BTN_TEXT_CANCEL"),
    },
    textLoading: {
        type: String,
        required: false,
        default: () => trans("BTN_TEXT_LOADING")
    },
    width: {
        type: String,
        required: false,
    },
    loading: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: false,
        default: "button"
    },
    ico: {
        type: String,
        required: false
    }
});

const loaderClass = computed(() => {
    return {
        'loaderSm': props.width === 'sm',
        'loaderLg': props.width === 'lg',
    };
});

const buttonClass = computed(() => {
    return [
        'btn',
        'btn-outline-danger',
        props.width ? `btn-${props.width}` : '',
        'd-flex',
        'justify-content-center'
    ];
});
</script>

<template>
    <button :class="buttonClass" :type="props.type" :disabled="props.loading">
        <div v-if="props.loading" class="d-flex justify-content-center">
            <div class="loader" :class="loaderClass"></div>
            <span class="ms-2">{{ props.textLoading }}</span>
        </div>

        <div v-else class="d-flex align-items-center p-0">
            {{ props.text }}
            <i v-if="props.ico" :class="[props.ico, 'ms-1']"></i>
        </div>
    </button>
</template>

<style scoped>
.loader {
    width: 24px;
    padding: 6px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 0.8s infinite linear;
}

.loaderSm {
    width: 21px !important;
    padding: 5px !important;
}

.loaderLg {
    width: 30px !important;
    padding: 7px !important;
}

@keyframes l3 {
    to {
        transform: rotate(1turn);
    }
}
</style>
