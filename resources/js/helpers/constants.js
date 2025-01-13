export const API_URL = "/api";
export const allowedRoles = ["support", "admin", "mod", "test", "visitor"];
export const hasAccessToTheApp = ["support", "admin", "mod"];

export const ACCEPT_IMAGES_TO_INPUT = "image/jpeg, image/jpg, image/png";
export const ACCEPT_IMAGES_VALIDATION = ["image/jpeg", "image/jpg", "image/png"];
export const ACCEPT_IMAGES_TO_MESSAGE = "jpeg, jpeg, png";

export const ACCEPT_ICONS_TO_INPUT = "image/vnd.microsoft.icon, image/x-icon, image/jpeg, image/jpg, image/png";
export const ACCEPT_ICONS_VALIDATION = ["image/vnd.microsoft.icon", "image/x-icon", "image/jpeg", "image/jpg", "image/png"];
export const ACCEPT_ICONS_TO_MESSAGE = "vnd.microsoft.icon, x-icon, jpeg, jpeg, png";

export const MAX_IMG_SIZE = 5;
export const MAX_ICO_SIZE = 2;

export const MIN_PASSWORD_LENGTH = 6;

export const DEFAULT_LOGO = new URL('@/assets/img/default/logo.png', import.meta.url).href;
export const DEFAULT_COVER = new URL('@/assets/img/default/coverImage.jpg', import.meta.url).href;
export const DEFAULT_ICO = new URL('@/assets/img/default/ico.ico', import.meta.url).href;
export const DEFAULT_IMG = new URL('@/assets/img/default/defaultImg.png', import.meta.url).href;
export const DEFAULT_IMG_USER = new URL('@/assets/img/default/user.jpg', import.meta.url).href;


export const UPLOADS_BASE_URL = `${API_URL}/uploads`;

// path to system uploads
export const SYSTEM_UPLOAD_PATH = `${UPLOADS_BASE_URL}/system`;
export const SYSTEM_IMAGE_PATH = `${SYSTEM_UPLOAD_PATH}/images`;

// path to user images
export const USER_IMAGE_PATH = `${UPLOADS_BASE_URL}/images/users`;