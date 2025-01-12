import { showError } from "@/helpers/showError";
import axios from "axios";
import AuthService from "./AuthService";

class SettingsService {
    async getAll() {
        try {
            return axios.get('/settings');
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async update(setting) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.post("/settings", setting, {
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

export default new SettingsService();