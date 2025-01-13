import { showAlert } from "@/helpers/showAlert";
import { trans } from "@/translation";

class SiteInfoValidator {
    validateForm = (formData, requiredFields) => {
        const errors = {};

        for(const field in formData) {
            const value = formData[field];

            const inputField = document.getElementById(field);
            if(inputField) {
                inputField.classList.remove('invalid-field');
            }

            if(requiredFields[field] && requiredFields[field].required) {
                if (!value.trim()) {
                    errors[field] = trans("FIELD_EMPTY_MESSAGE").replace('{field}', requiredFields[field].label);
                    inputField.classList.add('invalid-field');
                    continue;
                }
            }

            if(/[{<>|$]/.test(value) && value.length) {
                errors[field] = trans("FIELD_INVALID_CHARACTER").replace('{field}', requiredFields[field].label);
                inputField.classList.add('invalid-field');
                continue;
            }
        }

        if (Object.keys(errors).length > 0) {
            const errorList = Object.values(errors)
                .map((error) => `- ${error}`)
                .join("<br>");
    
            showAlert("warning", trans("INVALID_FIELDS_TITLE_MESSAGE"), errorList);
            return false;
        }

        return true;
    }
}

export default new SiteInfoValidator();