import {
    AsyncStorage
} from 'react-native';

class StorageService {

    static async addPinnedItem(pinned_items) {
        try {
            if (!pinned_items) return null;
            let str = JSON.stringify(pinned_items);
            await AsyncStorage.setItem('pinned_items', str);
        } catch (err) {
            console.log('AsyncStorage err: ', err);
        }
    }

    static async getPinnedItem() {
        try {
            let pinned_items = await AsyncStorage.getItem('pinned_items');
            if (!pinned_items) return [];
            return JSON.parse(pinned_items);
        } catch (err) {
            console.log('AsyncStorage err: ', err);
        }

    }
}

module.exports = StorageService;
