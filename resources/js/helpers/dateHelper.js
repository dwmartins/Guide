import { settingsStore } from "@/store/settingsStore";
import moment from "moment";

/**
 * @param {string|Date} date 
 * @returns {string} - The formatted date string in the format "day month year" ("November 28, 2024").
 */
export function getDateAsString(date) {
    const language = settingsStore.getSetting('language') || "pt-br";

    const data = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return data.toLocaleDateString(language, options);
}


/**
 * @param {string} date - The date string to be formatted (expected format: "YYYY-MM-DD").
 * @returns {string} - The formatted date string based on the `dateFormat` setting or the original input if invalid.
 */
export function simpleDate(date) {
    const formatString = settingsStore.getSetting('dateFormat') || 'DD-MM-YYYY';
    const inputFormat = 'YYYY-MM-DD';
    const parsedDate = moment(date, inputFormat, true);

    if (parsedDate.isValid()) {
        const normalizedFormatString = formatString.replace(/-/g, '/');
        return parsedDate.format(normalizedFormatString);
    } else {
        return date;
    }
}