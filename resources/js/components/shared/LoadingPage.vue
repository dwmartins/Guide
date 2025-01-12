<script setup>
import { loadingPageStore } from '@/store/loadingPageStore';
</script>

<template>
    <section v-if="loadingPageStore.props.show" class="loadingPageComponent">
        <div class="d-flex flex-column align-items-center">
            <div class="loader"></div>
            <p v-if="loadingPageStore.props.message" class="fw-semibold fs-5 text-center text-secondary mt-1">{{ loadingPageStore.props.message }}</p>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 999999;
}

.loader {
    width: 60px;
    padding: 10px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #409EFF;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 0.8s infinite linear;
}

@keyframes l3 {
    to {
        transform: rotate(1turn);
    }
}
</style>