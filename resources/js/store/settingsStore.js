import { reactive } from 'vue';

export const settingsStore = reactive({
    settings: [],
    maintenance: 'off',

    setSettings(data) {
        this.settings = data;
        this.maintenance = this.settings.maintenance;
    },

    getSetting(name) {
        return this.settings[name];
    },

    updateSetting(name, newValue) {
        this.settings[name] = newValue;
    },

    getAll() {
        return this.settings;
    }
})
