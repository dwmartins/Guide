import { reactive } from "vue";

export const loadingPageStore = reactive({
    props: {
        message: '',
        show: false
    },

    show(message = null) {
        this.props.message = message;
        this.props.show = true;
    },

    hide() {
        this.props.message = '';
        this.props.show = false;
    }
})