import { showAlert } from "@/helpers/showAlert";
import { trans } from "@/translation";
import { ACCEPT_ICONS_VALIDATION, ACCEPT_IMAGES_VALIDATION, MAX_ICO_SIZE, MAX_IMG_SIZE } from "@/helpers/constants";

class FileValidator {
    imgExtensions = ACCEPT_IMAGES_VALIDATION;
    imgSize = MAX_IMG_SIZE * 1024 * 1024; // 5MB

    iconExtensions = ACCEPT_ICONS_VALIDATION;
    iconFileSize = MAX_ICO_SIZE * 1024 * 1024; // 5MB

    img(image) { 
        if (image.size > this.imgSize) {
            showAlert('warning', '', trans('IMG_MAX_SIZE_MESSAGE'), 6000);
            return false;
        }

        if (!this.imgExtensions.includes(image.type)) {
            showAlert('warning', '', trans('UNSUPPORTED_IMG_MESSAGE'), 6000);
            return false;
        }

        return true;
    }

    icon(icon) {
        if (icon.size > this.iconFileSize) {
            showAlert('warning', '', trans('ICON_MAX_SIZE_MESSAGE'), 6000);
            return false;
        }
    
        if (!this.iconExtensions.includes(icon.type)) {
            showAlert('warning', '', trans('UNSUPPORTED_ICON_MESSAGE'), 6000);
            return false;
        }
    
        return true;
    }
}

export default new FileValidator();