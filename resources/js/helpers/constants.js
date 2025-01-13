export const API_URL = "/api";
export const allowedRoles = ["support", "admin", "mod", "test", "visitor"];
export const hasAccessToTheApp = ["support", "admin", "mod", "test"];

export const ACCEPT_IMAGES_TO_INPUT = "image/jpeg, image/jpg, image/png";
export const ACCEPT_IMAGES_VALIDATION = ["image/jpeg", "image/jpg", "image/png"];
export const ACCEPT_IMAGES_TO_MESSAGE = "jpeg, jpeg, png";

export const ACCEPT_ICONS_TO_INPUT = "image/vnd.microsoft.icon, image/x-icon, image/jpeg, image/jpg, image/png";
export const ACCEPT_ICONS_VALIDATION = ["image/vnd.microsoft.icon", "image/x-icon", "image/jpeg", "image/jpg", "image/png"];
export const ACCEPT_ICONS_TO_MESSAGE = "vnd.microsoft.icon, x-icon, jpeg, jpeg, png";

export const MAX_IMG_SIZE = 5;
export const MAX_ICO_SIZE = 2;

export const MIN_PASSWORD_LENGTH = 6;

export const DEFAULT_LOGO = "/assets/images/default/logo.png";
export const DEFAULT_COVER = "/assets/images/default/coverImage.jpg";
export const DEFAULT_ICO = "/assets/images/default/ico.ico";
export const DEFAULT_IMG = "/assets/images/default/defaultImg.png";
export const DEFAULT_IMG_USER = "/assets/images/default/user.jpg";


export const UPLOADS_BASE_URL = `${API_URL}/uploads`;

// path to system uploads
export const SYSTEM_UPLOAD_PATH = `${UPLOADS_BASE_URL}/system`;
export const SYSTEM_IMAGE_PATH = `${SYSTEM_UPLOAD_PATH}/images`;

// path to user images
export const USER_IMAGE_PATH = `${UPLOADS_BASE_URL}/images/users`;