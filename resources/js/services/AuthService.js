import { showAlert } from '@/helpers/showAlert';
import { showError } from '@/helpers/showError';
import { router } from '@/router';
import { userStore } from '@/store/userStore';
import { trans } from '@/translation';
import axios from 'axios';
import Cookies from 'js-cookie';

class AuthService {
    async login(data) {
        try {
            return await axios.post("/auth/login", data);
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    // function for login for administrators
    async AdminLogin(data) {
        try {
            return await axios.post("/auth/app/login", data);
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    setUserLogged(data, rememberMe = null) {
        userStore.updateUserLogged(data.user);

        const expires = rememberMe ? 30 : 1;

        data["expires"] = expires;

        Cookies.set("auth", JSON.stringify(data), {
            expires,
            secure: true,
            sameSite: "Strict"
        });

        Cookies.set("last_login", data.user.email, {
            secure: true,
            sameSite: "Strict"
        });
    }

    updateUserLogged(userData) {
        const auth = {
            user: userData,
            expires: this.getCookie("expires"),
            token: this.getCookie("token")
        }

        Cookies.set("auth", JSON.stringify(auth), {
            expires: this.getCookie("expires"),
            secure: true,
            sameSite: "Strict"
        });

        Cookies.set("last_login", userData.email, {
            secure: true,
            sameSite: "Strict"
        });

        userStore.updateUserLogged(userData);
    }

    getCookie(item) {
        const data = Cookies.get("auth");
        if(data) {
            const cookieData = JSON.parse(data);
            return cookieData[item];
        }

        return false; 
    }

    setUserStore() {
        const user = this.getUserLogged();
        if(user) {
            userStore.updateUserLogged(user);
        }
    }

    getToken() {
        return this.getCookie("token") ? this.getCookie("token") : false;
    }

    getUserLogged() {
        return this.getCookie("user") ? this.getCookie("user") : false;
    }

    getLastLogin() {
        return Cookies.get("last_login") || false;
    }

    getBearer() {
        const token = this.getToken();
        return `Bearer ${token}`;
    }

    checkAuth() {
        const user = this.getUserLogged();

        if (!user) {
            showAlert("error", '', trans('NOT_LOGGED'))
            this.logout();
            router.push(trans("PUBLIC_PATH_LOGIN"));
            return null;
        }

        return user;
    }

    async auth() {
        const user = this.getUserLogged();

        if(!user) {
            showAlert('error', '', trans('NOT_LOGGED'));
            const error = new Error(trans('NOT_LOGGED'));
            error.status = 401;
            throw error;
        }

        try {
            return await axios.get("/auth", {
                headers: {
                    "Authorization": this.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    // function to confirm if you are a logged in administrator
    async AdminAuth() {
        const user = this.getUserLogged();

        if(!user) {
            showAlert('error', '', trans('NOT_LOGGED'));
            const error = new Error(trans('NOT_LOGGED'));
            error.status = 401;
            throw error;
        }

        try {
            return await axios.get("/app/auth/auth", {
                headers: {
                    "Authorization": this.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    logout(showMessage = false) {
        if(showMessage) {
            showAlert('success', '', trans('LOGOUT_MESSAGE'));
        }

        Cookies.remove("auth", {
            secure: true,
            sameSite: "Strict"
        });

        userStore.clean();
        router.push(trans("PUBLIC_PATH_LOGIN"));
    }

    async register(data) {
        try {
            return await axios.post("/auth/register", data)
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async forgotPassword(data) {
        try {
            return await axios.post("/auth/forgot-password", data);
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async validatePasswordRecoveryToken(token) {
        try {
            return await axios.get("/auth/validate-password-recovery-token", {
                params: {token}
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async recoveryPassword(data) {
        try {
            return await axios.put("/auth/recovery-password", data);
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new AuthService();
