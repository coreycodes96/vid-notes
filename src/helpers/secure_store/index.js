import * as SecureStore from 'expo-secure-store';

//Create a store
export const createStore = async (key, data) => {
    await SecureStore.setItemAsync(key, data);
}

//Get a store
export const getStore = async (key) => {
    const result = await SecureStore.getItemAsync(key);

    if (result === null) return {};

    return JSON.parse(result);
}

//Updating a store
export const updateStore = async (key, data) => {
    const result = await SecureStore.getItemAsync(key);
    JSON.parse(result);

    if (result === null) return;

    await SecureStore.setItemAsync(key, data);
}

//Remove a store
export const removeStore = async (key) => {
    const result = await SecureStore.deleteItemAsync(key);
}