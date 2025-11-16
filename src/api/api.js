// Базовый URL выносим в константу
const BASE_URL = 'https://social-network.samuraijs.com/api/1.0/';
const API_KEY = "7f3fa617-efc9-40ea-a434-108ef2b1473b";
const HEADERS = {
    "API-KEY": API_KEY,
    // Fetch API требует явного указания Content-Type для POST/PUT
    "Content-Type": "application/json" 
};

// Функция-обертка для выполнения запросов с fetch
const fetchData = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: HEADERS,
        // Fetch автоматически обрабатывает withCredentials: true при работе с одним доменом,
        // но для кросс-доменных запросов нужно добавить credentials: 'include'.
        credentials: 'include' 
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return await fetch(BASE_URL + url, options)
        .then(response => {
            if (!response.ok) {
                // Обработка ошибок HTTP (например, 403 Forbidden)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            // Теперь data содержит то же самое, что и response.data в axios
            return data;
        });
};


export const usersApi = {
    getUsers (currentPage = 1, pageSize = 10) {
        // GET запрос
        return fetchData(`users?page=${currentPage}&count=${pageSize}`);
    },
    unfollow (userId) {
        // DELETE запрос
        return fetchData(`follow/${userId}`, 'DELETE');
    },
    follow (userId) {
        // POST запрос с пустым телом
        return fetchData(`follow/${userId}`, 'POST', {});
    },
    getProfile (userId) {
        console.log('Obsolete method. Please use profileApi object.');
        return profileApi.getProfile(userId);
    }
};

export const profileApi = {
    getProfile(userId) {
        // GET запрос
        return fetchData(`profile/${userId}`);
    },
    getStatus(userId) {
        // GET запрос
        return fetchData(`profile/status/` + userId);
    },
    updateStatus(status) {
        // PUT запрос с телом {status: status}
        return fetchData(`profile/status`, 'PUT', { status: status });
    }
};

export const authApi = {
    me() {
        // GET запрос
        return fetchData(`auth/me`);
    },
    login(email, password, rememberMe) {
        // POST запрос с телом
        return fetchData(`auth/login`, 'POST', { email, password, rememberMe});
    },
    logout() {
        // DELETE запрос
        return fetchData(`auth/login`, 'DELETE');
    }
};


// import axios from "axios";

// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//     headers: {
//         "API-KEY": "7f3fa617-efc9-40ea-a434-108ef2b1473b"
//     }
// })

// export const usersApi = {
//     getUsers (currentPage = 1, pageSize = 10) {
//         return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data;
//         })
//     },
//     unfollow (userId) {
//         return instance.delete(`follow/${userId}`)
//     },
//     follow (userId) {
//         return instance.post(`follow/${userId}`, {})
//     },
//     getProfile (userId) {
//         console.log('Obsolete method. Please profileApi object.')
//         return profileApi.getProfile(userId)
//     }
// }

// export const profileApi = {
//     getProfile(userId) {
//         return instance.get(`profile/${userId}`)
//     },
//     getStatus(userId) {
//         return instance.get(`profile/status/` + userId)
//     },
//     updateStatus(status) {
//         return instance.put(`profile/status`, { status: status })
//     }
// }

// export const authApi = {
//     me() {
//         return instance.get(`auth/me`)
//     },
//     login(email, password, rememberMe) {
//         return instance.post(`auth/login`, { email, password, rememberMe})
//     },
//     logout() {
//         return instance.delete(`auth/login`)
//     }
// }

// export const getUsers = async (currentPage = 1, pageSize = 10) => {
//     return await instance.get(`users?page=${currentPage}&count=${pageSize}`)
//     .then(response => {
//         return response.data;
//     })
// }

// export const getAuth = async () => {
//     return await instance.get(`auth/me`)
//     .then(response => {
//         return response.data;
//     })
// }

// export const deleteUser = async (id) => {
//     return await instance.delete(`follow/${id}`)
//     .then(response => {
//         return response.data;
//     })
// }

// export const postUser = async (id) => {
//     return await instance.post(`follow/${id}`, {})
//     .then(response => {
//         return response.data;
//     })
// }