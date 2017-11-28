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

    constructor() {
        super();

        this.state = {
            pinText: 'Pin to home',
        }
    }

    componentDidMount() {
        this.checkPinStatus(this.props.params.id)
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

    checkPinStatus = (id) => {
        StorageService.getPinnedItem().then(items => {
            console.log(items.length);
            if(items.length === 0) return null;
            let pinned_items = items;
            pinned_items.forEach(item => {
                if(item.id === id){
                    console.log(item.id);
                    console.log(id);
                    this.setState({
                        pinText: 'UnPin from home'
                    });
                }
            })
        });
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
        if(this.state.pinText === 'Pin to home') {
            StorageService.addPinnedItem(pinned_item);
            this.setState({
                pinText: 'UnPin from home'
            });
        }
        if(this.state.pinText === 'UnPin from home') {
            StorageService.removePinnedItem(pinned_item.id);
            this.setState({
                pinText: 'Pin to home'
            });
        }
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
            <Text>{this.state.pinText}</Text>
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
            width: responsiveWidth(35),
            height: responsiveHeight(4),
            borderWidth: responsiveWidth(1),
            borderRadius: responsiveHeight(2),
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
        },
        pin: {
            width: responsiveWidth(35),
            height: responsiveHeight(3),
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    module.exports = Article;
