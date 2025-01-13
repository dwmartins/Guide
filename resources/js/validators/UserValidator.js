import { MIN_PASSWORD_LENGTH } from "@/helpers/constants";
import { showAlert } from "@/helpers/showAlert";
import { trans } from "@/translation";

class UserValidator {
    validateForm = (formData, requiredFields) => {
        const errors = {};
        const nameFields = ["name", "lastName"];
        const numericFields = ["phone", "zipCode"];
        const passwordFields = ["password", "newPassword"];
    
        for (const field in formData) {
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
    
            if(field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors[field] = trans("EMAIL_INVALID_MESSAGE");
            }
    
            if(passwordFields.includes(field) && value.length < MIN_PASSWORD_LENGTH) {
                debugger
                errors[field] = trans("PASSWORD_MIN_LENGTH_REQUIREMENT");
            }
    
            if (nameFields.includes(field) && value.length && !/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
                inputField.classList.add('invalid-field');
                errors[field] = trans("FIELD_INVALID_CHARACTER").replace('{field}', requiredFields[field].label);
            }

            if(numericFields.includes(field) && typeof value !== "number" && isNaN(value)) {
                inputField.classList.add('invalid-field');
                errors[field] = trans("FIELD_INVALID_NUMERIC_MESSAGE").replace('{field}', requiredFields[field].label);
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

export default new UserValidator();