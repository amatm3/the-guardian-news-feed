import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

class Article extends React.Component {

    render() {
        this.props.params = this.props.params || {};
        return (
            <View style={styles.container}>
            <View style={styles.tittle}>
            <Text fontSize={responsiveFontSize(5)}>{this.props.params.title}</Text>
            </View>
            <ScrollView>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(100),
        width: responsiveWidth(100),
    },
    tittle: {
        marginTop: responsiveHeight(3),
        width: responsiveWidth(100),
        height: responsiveHeight(3),
    }
});

export default Article;
