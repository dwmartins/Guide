import { showError } from "@/helpers/showError";
import AuthService from "./AuthService";
import axios from "axios";

class EmailService {
    async getEmailSettings() {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.get("/settings/email-config", {
                headers: {
                    "Authorization": AuthService.getBearer()
                }
            })
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateEmailSettings(data) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.post("/settings/email-config", data, {
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

export default new EmailService();