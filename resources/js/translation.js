let translations = {};

async function loadTranslations(lang) {
    try {
        const module = await import(`./translations/${lang}.js`);
        translations = module;
        document.documentElement.lang = lang;
    } catch (error) {
        console.error(`Failed to load translations for language: ${lang}`, error);
        throw error
    }
}

export async function setLanguage(lang) {
    await loadTranslations(lang);
}

export function trans(key) {
    return translations[key] || key;
}