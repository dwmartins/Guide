import { ElNotification } from 'element-plus'

export function showAlert (type, title, message, duration = 4500) {
    ElNotification({
        type: type,
        title: title,
        message: message,
        dangerouslyUseHTMLString: true,
        duration: duration
    });
}