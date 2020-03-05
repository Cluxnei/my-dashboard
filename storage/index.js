import {AsyncStorage} from 'react-native';

export const getData = async (key) => {
    try {
        return JSON.parse(await AsyncStorage.getItem(`@${key}`, () => {}));
    } catch(e) {
        return null;
    }
};

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value, () => {});
    } catch (e) {
        return false;
    }
    return true;
};