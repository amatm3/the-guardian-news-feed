import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, WebView} from 'react-native';
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
            <Image source={{uri: this.props.params.thumbnail}} style={{height: responsiveWidth(80), width: responsiveWidth(80)}}/>
            <TouchableOpacity style={styles.pin} onPress={this.handleOnPressPin()/}>

            <WebView
            source={{html: this.props.params.body}}
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
    }
});

export default Article;
