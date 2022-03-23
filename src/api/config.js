import axios from 'axios';
import { getStore, updateStore } from '../helpers/secure_store/index';

export const api = () => {
    const request = axios.create({
        baseURL: 'http://192.168.1.114:5000',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    request.interceptors.request.use(
        async (res) => {
            const { accessToken, refreshToken } = await getStore('user');

            if (accessToken && refreshToken) {
                axios.defaults.headers["authorization"] = `Bearer ${accessToken}`;
                axios.defaults.headers["x-refresh"] = `Bearer ${refreshToken}`;
            }

            return res;
        },
        (err) => {
            if (err.message === 'Network Error') {
                console.log('Request: Network Error');
                return 'Network Error';
            }

            if (err.message === 'canceled') {
                return err.message;
            }

            return Promise.reject(err);
        }
    );

    request.interceptors.response.use(
        async (res) => {
            const { accessToken, refreshToken } = await getStore('user');

            if (accessToken && refreshToken) {
                axios.defaults.headers["authorization"] = `Bearer ${accessToken}`;
                axios.defaults.headers["x-refresh"] = `Bearer ${refreshToken}`;
            }

            if (res.headers["x-access"]) {
                axios.defaults.headers["authorization"] = `Bearer ${res.headers["x-access"]}`;
            }

            if (res.config.url === "/user/login" && res.status === 200) {
                axios.defaults.headers["authorization"] = `Bearer ${res.data.accessToken}`;
                axios.defaults.headers["x-refresh"] = `Bearer ${res.data.refreshToken}`;
            }

            if(accessToken !== res.headers["x-access"]){
                console.log('update access token here');
                const user = await getStore('user');

                const updatedUser = {
                    ...user,
                    accessToken: res.headers["x-access"] === undefined ? accessToken : res.headers["x-access"],
                    data: {
                        ...user.data
                    },
                };

                console.log(updatedUser);

                updateStore('user', JSON.stringify(updatedUser));
            }

            return res;
        },
        (err) => {
            console.log(err.response.status);
            if (err.message === 'Network Error') {
                console.log('Response: Network Error');
                return 'Network Error';
            }

            if (err.message === 'canceled') {
                return err.message;
            }

            if (err.response.status === 401) {
                return axios.request(err.config);
            }

            return Promise.reject(err);
        }
    );

    return request;
}