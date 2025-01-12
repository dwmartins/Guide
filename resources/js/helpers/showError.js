import AuthService from "@/services/AuthService";
import { router } from "@/router";
import { showAlert } from "./showAlert";
import { trans } from "@/translation";

export function showError(error) {
    console.error('ERROR', error);

    const message = error.response?.data?.message;
    const shouldLogout = error.response?.data?.logout;
    const redirect = error.response?.data?.redirect;

    if (message) {
        showAlert('error', '', message);
    } else {
        showAlert('error', '', trans('FATAL_ERROR_MESSAGE'));
    }

    if (shouldLogout) {
        AuthService.logout();
    } else if (redirect) {
        router.push(trans("PUBLIC_PATH_LOGIN"));
    }
}