import AsyncStorage from '@react-native-community/async-storage';

export const getId = async (key) => {
    try {
      return await AsyncStorage.getItem('ammpsp@id') || null;
    } catch (e) {
        throw e;
      console.warn('UTILS: getData (' + key + ')');
    }
}
  
export const getToken = async (key) => {
    try {
      return await AsyncStorage.getItem('ammpsp@token') || null;
    } catch (e) {
        throw e;
      console.warn('UTILS: getData (' + key + ')');
    }
}

export const setData = async (key, data, callback) => {
    try {
      return await AsyncStorage.setItem('ammpsp@' + key, data, callback ? callback : null);
    } catch (e) {
        throw e;
      console.warn('UTILS setData (' + key + ' ' + data + ')');
    }
}
  