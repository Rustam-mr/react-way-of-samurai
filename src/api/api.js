// Базовый URL выносим в константу
const BASE_URL = 'https://social-network.samuraijs.com/api/1.0/';
const API_KEY = "7f3fa617-efc9-40ea-a434-108ef2b1473b";

// HEADERS по умолчанию (для JSON)
const JSON_HEADERS = {
    "API-KEY": API_KEY,
    "Content-Type": "application/json" 
};
// Заголовки для загрузки файлов (multipart/form-data) не должны содержать Content-Type, 
// браузер установит его автоматически при использовании FormData.
const FILE_HEADERS = {
    "API-KEY": API_KEY,
};


// Функция-обертка для выполнения запросов с fetch
// Теперь она не перехватывает ошибки HTTP, а просто возвращает JSON-данные.
const fetchData = async (url, method = 'GET', body = null, customHeaders = JSON_HEADERS) => {
    const options = {
        method,
        headers: customHeaders, // Используем кастомные или JSON-заголовки
        credentials: 'include' 
    };

    // Если тело запроса не FormData (а обычный объект), JSON-им его
    if (body && ! (body instanceof FormData)) {
        options.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
        options.body = body;
    }
    const response = await fetch(BASE_URL + url, options);

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        // Если ответ содержит JSON, парсим его
        return response.json(); 
    } else {
        // Если ответ не JSON (например, пустой или HTML-страница ошибки), 
        // просто возвращаем объект ответа или null, чтобы не было SyntaxError
        return null; 
    }
};


export const usersApi = {
    getUsers (currentPage = 1, pageSize = 10) {
        return fetchData(`users?page=${currentPage}&count=${pageSize}`);
    },
    unfollow (userId) {
        return fetchData(`follow/${userId}`, 'DELETE');
    },
    follow (userId) {
        return fetchData(`follow/${userId}`, 'POST', {});
    },
    getProfile (userId) {
        console.log('Obsolete method. Please use profileApi object.');
        return profileApi.getProfile(userId);
    }
};

export const profileApi = {
    getProfile(userId) {
        return fetchData(`profile/${userId}`);
    },
    getStatus(userId) {
        return fetchData(`profile/status/` + userId);
    },
    updateStatus(status) {
        return fetchData(`profile/status`, 'PUT', { status: status });
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return fetchData(`profile/photo`, 'PUT', formData, FILE_HEADERS);
    },
    saveProfile(profile) {
        return fetchData(`profile`, 'PUT', profile)
    }
};

export const authApi = {
    me() {
        return fetchData(`auth/me`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return fetchData(`auth/login`, 'POST', { email, password, rememberMe, captcha});
    },
    logout() {
        return fetchData(`auth/login`, 'DELETE');
    }
};

export const securityApi = {
    getCaptchaUrl() {
        return fetchData(`/security/get-captcha-url`)
    }
}
