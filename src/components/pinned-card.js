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

class PinnedCard extends React.Component {

    handleOnPress = () => {
        this.props.updateScreen(AppConstants.screens.ARTICLE, this.props);

    }

    render() {
        const { image } = styles;
        if (!this.props.thumbnail) {
            this.props.thumbnail = AppConstants.DEFAULT_PHOTO_URL;
        }
        return(
            <TouchableOpacity style={styles.image} onPress={this.handleOnPress}>
            <Image style={styles.image} source={{uri: this.props.thumbnail}}/>
            </TouchableOpacity>
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
    image: {
        height:responsiveWidth(35),
        width:responsiveWidth(35),
        marginLeft: responsiveWidth(3),
        marginRight: responsiveWidth(3)
    }
};

module.exports = PinnedCard;
