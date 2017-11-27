import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, WebView, TouchableOpacity} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import StorageService from './../core/storage.js'

class Article extends React.Component {

    handleOnPressPin = () => {
        StorageService.addPinnedItem('pinned_items');
    }

    render() {
        this.props.params = this.props.params || {};
        return (
            <View style={styles.container}>
            <View style={styles.tittle}>
            <Text fontSize={responsiveFontSize(5)}>{this.props.params.title}</Text>

            </View>
            <View>
            <Image source={{uri: this.props.params.thumbnail}} style={{marginTop: responsiveHeight(2), height: responsiveWidth(80), width: responsiveWidth(80)}}/>
            <TouchableOpacity style={styles.pin} onPress={this.handleOnPressPin()}/>
            </View>
            <WebView
            source={{html: this.props.params.body}}
            style={{height: responsiveHeight(50),
            width: responsiveWidth(90),}}
            />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    tittle: {
        marginTop: responsiveHeight(3),
        width: responsiveWidth(100),
        height: responsiveHeight(3),
    },
    pin: {
        marginTop: responsiveHeight(2),
        width: responsiveWidth(80),
        height: responsiveHeight(4),
        backgroundColor: 'red'
    }
});

export default Article;
