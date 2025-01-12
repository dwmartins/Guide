import { showError } from '@/helpers/showError';
import AuthService from './AuthService';
import axios from 'axios';

class SiteInfoService {
    async getSiteInfo() {
        try {
            return  await axios.get('/site_info');
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async update(data) {
        if(!AuthService.checkAuth()) {
            return;
        }

        try {
            return await axios.post("/site_info", data, {
                headers: {
                    "Authorization": AuthService.getBearer(),
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateImages(images) {
        if(!AuthService.checkAuth()) {
            return;
        }

        const formData = new FormData();

        for (let key in images) {
            if (images[key] !== null) {
                formData.append(key, images[key]);
            }
        }

        try {
            return await axios.post("/site_info/updateimages", formData, {
                headers: {
                    "Authorization": AuthService.getBearer(),
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new SiteInfoService();
