import axios from "axios";
import AuthService from "./AuthService";
import { showError } from "@/helpers/showError";

class UserService {
    async update(userData) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.put("/user", userData, {
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateAddress(userData) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.put(`/user/address`, userData,{
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            }) 
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updatePassword(userData) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.put("/user/password", userData, {
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateSettings(userData) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.put("/user/settings", userData, {
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updatePhoto(file) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append("photo", file);
    
            return await axios.post("/user/update-photo", formData, {
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async deleteAccount(userId) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.delete(`user/${userId}`, {
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new UserService();