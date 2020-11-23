import AsyncStorage from "@react-native-community/async-storage"
import * as SecureStore from 'expo-secure-store'

export default class Storage {

    constructor() {

    }

    static updateObject(object: {}, updateObject: {}) {
        for (let keyUpdate in updateObject) {
            let update = false
            if (object) {
                for (let key in object) {
                    if (keyUpdate == key) {
                        object[key] = updateObject[keyUpdate]
                        update = true
                        break
                    }
                }
            } else {
                object = {}
            }
            if (!update) {
                object[keyUpdate] = updateObject[keyUpdate]
            }
        }
        return object
    }

    static async storeToken(token: string) {
        try {
            await SecureStore.setItemAsync("token", token)
            return true
        } catch (e) {
            console.error("error storeToken: " + e)
            return false
        }
    }

    static async getToken() {
        try {
            const token = await SecureStore.getItemAsync('token')
            return token;
        } catch (e) {
            console.error("error getToken: " + e)
            return false
        }
    }

    static async storeData(object: {}) {
        try {
            var data = await this.getData()
            const updateObject = this.updateObject(data, object)
            const jsonValue = JSON.stringify(updateObject)
            await AsyncStorage.setItem('@storage', jsonValue)
            return true
        } catch (e) {
            console.error("error storeData: " + e)
            return false
        }
    }

    static async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("error getData: " + e)
            return false
        }
    }

    removeData = async () => {
        try {
            await AsyncStorage.removeItem('@storage')
            return true
        } catch (e) {
            console.error("error removeData: " + e)
            return false
        }
    }
}