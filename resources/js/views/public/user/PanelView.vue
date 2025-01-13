<script setup>
import { getDateAsString } from '@/helpers/dateHelper';
import SEOManager from '@/helpers/SEOManager';
import { siteInfoStore } from '@/store/siteInfoStore';
import { userStore } from '@/store/userStore';
import { trans } from '@/translation';
import { computed, onBeforeMount } from 'vue';
import { DEFAULT_IMG_USER, USER_IMAGE_PATH, } from '@/helpers/constants';

const user = computed(() => userStore.user);
const userPhoto = computed(() => user.value.photo ? `${USER_IMAGE_PATH}/${user.value.photo}?t=${Date.now()}` : DEFAULT_IMG_USER);

onBeforeMount(() => {
    const SEOTitle = siteInfoStore.constants.webSiteName ? `${trans("SEO_TITLE_USER_PANEL")} | ${siteInfoStore.constants.webSiteName}` : trans("SEO_TITLE_USER_PANEL");
    SEOManager.setTitle(SEOTitle);
});

const setGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
        return trans('GOOD_MORNING');
    } else if (hour >= 12 && hour < 18) {
        return trans('GOOD_AFTERNOON');
    } else {
        return trans('GOODNIGHT');
    }
}

</script>

<template>
    <section class="panelView showPage">
        <div class="container my-3 my-sm-5">
            <div class="row">
                <!-- User info -->
                <div class="col-12 col-lg-3 p-2">
                    <div class="d-flex gap-2 flex-column flex-sm-row flex-lg-column align-items-center justify-content-center p-3 shadow rounded rounded-2 bg-light">
                        <div class="user_img">
                            <img :src="userPhoto" alt="User image">
                        </div>

                        <div class="d-flex flex-column align-items-center">
                            <p class="custom_dark fw-semibold text-truncate mt-2 mb-0 fulName">{{ user.name }} {{ user.lastName }}</p>
                            <p class="text-secondary fs-8 text-truncate user_email">{{ user.email }}</p>
                            <p class="custom_dark fw-semibold fs-8 text-break mb-0">{{ trans('MEMBER_SINCE') }}:</p>
                            <p class="text-secondary fs-8 text-break">{{ getDateAsString(user.created_at) }}</p>
                            <p v-if="user.city && user.state" class="text-secondary fs-8 text-break">{{ user.city }}, {{ user.state }}</p>

                            <router-link :to="trans('PUBLIC_PATH_USER_PROFILE')">
                                <button class="btn btn-sm btn-primary">{{ trans('EDIT_PROFILE') }}<i class="fa-solid fa-user-pen ms-2"></i></button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- Contents -->
                <div class="col-12 col-lg-9 p-2">
                    <div class="p-3">
                        <h5 class="custom_dark fw-semibold">{{ setGreeting() }} {{ user.name }}</h5>
                        <p class="text-secondary"> {{ trans('WELCOME_TO_YOU_AREA') }}</p>
                    </div>

                    <hr class="text-secondary">

                    <div class="d-flex flex-column align-items-center">
                        <img src="@assets/svg/empty.svg" class="img_no_ads" alt="Empty">
                        <p class="text-secondary text-center">{{ trans('DONT_HAVE_ADS_MESSAGE') }}</p>
                        
                        <router-link :to="trans('PUBLIC_PATH_PLANS')">
                            <button class="btn btn-outline-primary">{{ trans('ADVERTISE_NOW') }}<i class="fa-solid fa-arrow-up-right-from-square ms-2"></i></button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.user_img img{
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 8px solid #fff;
    object-fit: cover;
}

.img_no_ads {
    width: 60%;
}

@media screen and (max-width: 768px){
    .img_no_ads {
        width: 90%;
    } 
}

.user_email, .fulName {
    max-width: 210px;
}
</style>