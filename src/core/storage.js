import React from 'react';
import {
    AsyncStorage
} from 'react-native';

class StorageService extends React.Component{

    static async addPinnedItem(pinned_item) {
        try {
            if (!pinned_item) return null;
            let current_items = await StorageService.getPinnedItem();
            let exists = false;
            current_items.forEach(item => {
                if (item.id == pinned_item.id) {
                    exists = true;
                }
            });
            if (!exists) {
                current_items.push(pinned_item);
            }
            await AsyncStorage.setItem('pinned_items', JSON.stringify(current_items));
        } catch (err) {
            console.log('AsyncStorage err: ', err);
        }
    }

    static async removePinnedItem(id) {
        try {
            if (!id) return;
            let pinned_items = await StorageService.getPinnedItem();
            let pos = -1;
            pinned_items.forEach((item, i) => {
                if (item.id == id) {
                    pos = i;
                }
            });
            if (pos != -1) {
                pinned_items.splice(pos, 1);
            }
            await AsyncStorage.setItem('pinned_items', JSON.stringify(pinned_items));
        } catch (err) {
            console.log('AsyncStorage remove err: ', err);
            return null;
        }
    }

    static async getPinnedItem() {
        try {
            let pinned_items = await AsyncStorage.getItem('pinned_items');
            if (!pinned_items) return [];
            return JSON.parse(pinned_items);
        } catch (err) {
            console.log('AsyncStorage err: ', err);
            return [];
        }

    }
}

module.exports = StorageService;
