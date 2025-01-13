<script setup>
import AppLoader from '@/components/shared/AppLoader.vue';
import BtnOutlineDanger from '@/components/shared/buttons/BtnOutlineDanger.vue';
import BtnOutlinePrimary from '@/components/shared/buttons/BtnOutlinePrimary.vue';
import { ACCEPT_IMAGES_TO_INPUT, DEFAULT_IMG_USER, USER_IMAGE_PATH } from '@/helpers/constants';
import { getDateAsString } from '@/helpers/dateHelper';
import { compressImage } from '@/helpers/imageHelper';
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import { settingsStore } from '@/store/settingsStore';
import { userStore } from '@/store/userStore';
import { trans } from '@/translation';
import FileValidator from '@/validators/FileValidator';
import { computed, ref } from 'vue';

const user = computed(() => userStore.user);
const userImage = ref(user.value.photo ? `${USER_IMAGE_PATH}/${user.value.photo}?t=${Date.now()}` : DEFAULT_IMG_USER);

let previewImg = ref("");

const imgToUpdate = ref("");

const isLoading = ref({
    updateImg: false,
    uploadImg: false
});

const handleFileChange =  async (event) => {
    try {
        const fileInput = event.target;
        const file = fileInput.files?.[0];

        if (!file) return;

        if(!FileValidator.img(file)) {
            fileInput.value = "";
            return;
        }

        isLoading.value.uploadImg = true;

        if(settingsStore.getSetting("compressImage") == "on") {
            imgToUpdate.value = await compressImage(file);
        } else {
            imgToUpdate.value = file;
        }

        const reader = new FileReader();

        reader.onload = () => {
            previewImg.value = reader.result.toString();
            isLoading.value.uploadImg = false;
        };

        reader.readAsDataURL(file);

    } catch (error) {
        isLoading.value.uploadImg = false;
        showAlert("error", "", trans("FATAL_ERROR_MESSAGE"));
        console.error("Error loading image", error);
    }
}

const submitImage = async () => {
    try {
        isLoading.value.updateImg = true;
        const response = await UserService.updatePhoto(imgToUpdate.value);

        AuthService.updateUserLogged(response.data.userData);
        showAlert('success', '', response.data.message);

        userImage.value = previewImg.value;
        previewImg.value = "";
        isLoading.value.updateImg = false;
    } catch (error) {
        isLoading.value.updateImg = false;
        console.error(error);
    }
}

const cancelEditPhoto = () => {
    const fileInput = document.getElementById("new_img");
    fileInput.value = "";
    previewImg.value = "";
}

</script>

<template>
    <div class="item_center d-flex flex-wrap gap-3 p-3 rounded rounded-2 my-sm-2 mb-sm-5">
        <div>
            <div class="position-relative user_img item_center">
                <img :src="previewImg ? previewImg : userImage" alt="user image">

                <label v-show="!isLoading.uploadImg" for="new_img" class="btn_change_img"><i class="fa-solid fa-pencil"></i></label>
                <input type="file" id="new_img" class="d-none" :accept="ACCEPT_IMAGES_TO_INPUT" @change="handleFileChange($event)">

                <div v-show="isLoading.uploadImg" class="app_loader">
                    <AppLoader />
                </div>
            </div>

            <div v-show="previewImg">
                <div class="d-flex justify-content-center gap-2 py-3 showItem">
                    <BtnOutlinePrimary
                        @click="submitImage()"
                        width="sm"
                        :loading="isLoading.updateImg"
                    />

                    <div v-show="!isLoading.updateImg">
                        <BtnOutlineDanger
                            width="sm"
                            @click="cancelEditPhoto()"
                            :loading="false"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column align-items-center">
            <p class="custom_dark fw-semibold mt-2 mb-0 d-inline-block text-truncate fullName">{{ user.name }} {{ user.lastName }}</p>
            <p class="text-secondary fs-8 text-break text-truncate email">{{ user.email }}</p>
            <p class="custom_dark fw-semibold fs-8 text-break mb-0">{{ trans("MEMBER_SINCE") }}</p>
            <p class="text-secondary fs-8 text-break">{{ getDateAsString(user.created_at) }}</p>
        </div>
    </div>
</template>

<style scoped>
.user_img img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 8px solid #ececec93;
    object-fit: cover;
}

.btn_change_img {
    position: absolute;
    background-color: var(--primary);
    color: #fff;
    border-radius: 50%;
    bottom: 20px;
    right: 0px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease;
}

.btn_change_img:hover {
    background-color: var(--primary-hover);
}

.app_loader {
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 8px solid #ffff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000077;
}

.fullName, .email {
    max-width: 220px
}
</style>