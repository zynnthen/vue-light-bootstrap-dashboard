/* eslint-disable */
import axios from 'axios';
// import { forceRefreshToken } from "../utils/auth";
// import session from "../utils/session";
import CONSTANTS from 'src/utils/constants';

const api = axios.create({
    baseURL: CONSTANTS.API_END_POINT,
    timeout: 0 // default is `0` (no timeout)
});

export function setApiHeader(idToken = null) {
    if (idToken) {
        api.defaults.headers.common['X-Auth-Firebase'] = idToken;
    }
}

// // Add a request interceptor
// api.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("interceptors response", response)
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error("interceptors response", error)
    console.error("interceptors response", error.response.status)
    if (error.response.status === 403) {
        if (!error.config.isRetryRequest) {
            // await forceRefreshToken();
            const { method, url } = error.config;
            return api.request({ method, url, isRetryRequest: true });
        }
    }
    return Promise.reject(error);
});

export default api;
