import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    WebView,
    BackHandler,
    TouchableOpacity
} from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import StorageService from './../core/storage.js';
import AppConstants from './../core/constants.js';

class Article extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.updateScreen(AppConstants.screens.BACK_PRESSED, {
            from_screen: AppConstants.screens.ARTICLE
        });
        return true;
    }

    handleOnPressPin = () => {
        if (!this.props.params) return null;
            let pinned_item = {
                title: this.props.params.title,
                thumbnail: this.props.params.thumbnail,
                body: this.props.params.body,
                category: this.props.params.category,
                id: this.props.params.id
            };
        StorageService.addPinnedItem(pinned_item);
    }

    handleOnPressUnPin = () => {
        if (!this.props.params) return null;
        let pinned_item_id = this.props.params.id;
        StorageService.removePinnedItem(pinned_item_id);
    }

    render() {
        this.props.params = this.props.params || {};
        return (
            <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={this.handleBackPress}>
            <Image style={styles.backImage} source={require('./../../resources/icons/Back.png')} />
            </TouchableOpacity>
            <View style={styles.tittle}>
            <Text fontSize={responsiveFontSize(2.5)}>{this.props.params.title}</Text>
            </View>
            <Image style={styles.image} source={{uri: this.props.params.thumbnail}}/>
            <View style={styles.pinView}>
            <TouchableOpacity style={styles.pin} onPress={this.handleOnPressPin}>
            <Text>{'Pin to Home'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unPin} onPress={this.handleOnPressUnPin}>
            <Text>{'UnPin from Home'}</Text>
            </TouchableOpacity>
            </View>
            <WebView
            source={{html: this.props.params.body}}
            style={{height: responsiveHeight(150),
                width: responsiveWidth(90),}}
            />
            </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: responsiveHeight(2.5),
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            alignItems: 'center'
        },
        back: {
            marginLeft: responsiveWidth(1),
            width: responsiveWidth(100),
            height: responsiveHeight(3),
            backgroundColor: 'green'
        },
        backImage: {
            width: responsiveWidth(3),
            height: responsiveHeight(3)
        },
        tittle: {
            marginTop: responsiveHeight(3),
            width: responsiveWidth(90),
            height: responsiveHeight(3)
        },
        image: {
            marginTop: responsiveHeight(2),
            height: responsiveWidth(50),
            width: responsiveWidth(90)
        },
        pinView: {
            marginTop: responsiveHeight(0.5),
            width: responsiveWidth(85),
            height: responsiveHeight(4),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        pin: {
            borderRadius: responsiveHeight(2),
            marginLeft: responsiveWidth(3.5),
            marginRight: responsiveWidth(1.5),
            width: responsiveWidth(35),
            height: responsiveHeight(3),
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center'
        },
        unPin: {
            borderRadius: responsiveHeight(2),
            marginLeft: responsiveWidth(1.5),
            marginRight: responsiveWidth(3.5),
            width: responsiveWidth(35),
            height: responsiveHeight(3),
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    module.exports = Article;
