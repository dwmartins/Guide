<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    width: {
        type: String,
        Required: false,
    },
    color: {
        type: String,
        Required: false,
        default: "bg-primary"
    }
});

const loaderClass = computed(() => {
    const { width, color } = props;

    return {
        [`${color}`]: true,
        'loaderSm': width === 'sm',
        'loaderLg': width === 'lg',
    };
});

</script>

<template>
    <div class="loader" :class="loaderClass"></div>
</template>

<style scoped>
.loader {
    width: 40px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
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
    width: 55px !important;
    padding: 9px !important;
}

@keyframes l3 {
    to {
        transform: rotate(1turn);
    }
}
</style>