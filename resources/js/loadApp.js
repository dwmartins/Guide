import AuthService from "./services/AuthService";
import SettingsService from "./services/SettingsService";
import SiteInfoService from "./services/SiteInfoService";
import { settingsStore } from "./store/settingsStore";
import { siteInfoStore } from "./store/siteInfoStore";
import { setLanguage } from "./translation";

export default async function loadApp() {
    const [siteInfoResponse, settingsResponse] = await Promise.all([
        SiteInfoService.getSiteInfo(),
        SettingsService.getAll()
    ]);

    AuthService.setUserStore();
    
    siteInfoStore.updateConstants(siteInfoResponse.data);
    settingsStore.setSettings(settingsResponse.data);

    const language = settingsResponse.data.language || "pt-br";

    await setLanguage(language);
}