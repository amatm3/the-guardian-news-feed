import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

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
        if(this.props.height) {
            image.height = this.props.height;
        }
        if(this.props.width) {
            image.width = this.props.width;
        }
        if (!this.props.thumbnail) {
            this.props.thumbnail = AppConstants.DEFAULT_PHOTO_URL;
        }
        return(
            <View style={styles.container}>
                <View style={styles.tittle}>
                    <Text style={{fontSize: responsiveHeight(5)}}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={styles.image} resizeMode={'contain'} onPress={this.handleOnPress()}>
                <Image style={styles.image} source={{uri: this.props.thumbnail}}/>
                </TouchableOpacity>
                <View style={styles.category}>
                    <Text style={{ fontSize: responsiveHeight(5)}}>{this.props.category}</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: responsiveHeight(2.5),
        height: responsiveWidth(90),
        width: responsiveWidth(90),
        alignItems: 'center',
    },
    image: {
        marginTop: responsiveHeight(2),
        height:responsiveWidth(80),
        width:responsiveWidth(80)
    },
    tittle: {
        borderColor: 'red',
        height: responsiveHeight(2),
        width: responsiveWidth(80),
    },
    category: {
        marginTop: responsiveHeight(2),

    }

};

export default Card;
