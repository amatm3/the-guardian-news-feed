import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import AppConstants from './../core/constants.js';

class Card extends React.Component {

    handleOnPress = () => {
        this.props.updateScreen(AppConstants.screens.ARTICLE, this.props);

    }

    render() {
        const { image } = styles;
        if (this.props.height) {
            image.height = this.props.height;
        }
        if (this.props.width) {
            image.width = this.props.width;
        }
        if (!this.props.thumbnail) {
            this.props.thumbnail = AppConstants.DEFAULT_PHOTO_URL;
        }
        return(
            <View style={styles.container}>
            <View>
            <Text style={styles.categoryText}>{this.props.category}</Text>
            </View>
            <TouchableOpacity style={styles.image} onPress={this.handleOnPress}>
            <Image style={styles.image} source={{uri: this.props.thumbnail}}/>
            </TouchableOpacity>
            <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: responsiveHeight(2.5),
        height: responsiveWidth(100),
        width: responsiveWidth(100),
        alignItems: 'center'
    },
    titleView: {
        marginTop: responsiveHeight(1),
        height: responsiveHeight(2),
        width: responsiveWidth(90),
        alignItems: 'center'
    },
    titleText: {
        fontSize: responsiveFontSize(2)
    },
    image: {
        marginTop: responsiveHeight(0.5),
        height:responsiveWidth(80),
        width:responsiveWidth(80)
    },
    categoryText: {
        fontSize: responsiveFontSize(3)
    }
};

module.exports = Card;
