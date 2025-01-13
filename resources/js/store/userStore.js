import { reactive } from "vue";

export const userStore = reactive({
    userLogged: false,

    user: {
        id: null,
        name: "",
        lastName: "",
        email: "",
        password: "",
        active: "",
        role: "",
        description: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        complement: "",
        city: "",
        zipCode: "",
        state: "",
        country: "",
        photo: "",
        acceptsEmails: "",
        publishContactInfo: "",
        created_at: "",
        updated_at: ""
    },

    updateUserLogged(data) {
        this.user = { ...this.user, ...data };
        this.userLogged = true;
    },

    clean() {
        this.userLogged = false;
        
        for (let key in this.user) {
            if (typeof this.user[key] === 'object') {
                for (let subKey in this.user[key]) {
                    this.user[key][subKey] = "";
                }
            } else {
                this.user[key] = "";
            }
        }
    }
});
