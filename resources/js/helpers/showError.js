import AuthService from "@/services/AuthService";
import { router } from "@/router";
import { showAlert } from "./showAlert";
import { trans } from "@/translation";

export function showError(error) {
    console.error('ERROR', error);

    const message = error.response?.data?.message;
    const errors = error.response?.data?.errors;

    if(typeof errors === 'object' && Object.keys(errors).length > 0) {
        const errorList = Object.entries(errors)
        .map(([field, messages]) => {
                return messages.map((message) => `- ${message}`).join('<br>');
            })
            .join('<br>');


        showAlert("warning", trans("INVALID_FIELDS_TITLE_MESSAGE"), errorList);
    }

    const shouldLogout = error.response?.data?.logout;
    const redirect = error.response?.data?.redirect;

    if (message && !errors) {
        showAlert('error', '', message);
    }

    if (shouldLogout) {
        AuthService.logout();
        return;

    } else if (redirect) {
        router.push(trans("PUBLIC_PATH_LOGIN"));
        return;
    }

    showAlert('error', '', trans('FATAL_ERROR_MESSAGE'));
}