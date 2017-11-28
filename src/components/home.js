
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Platform
} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import FeedCard from './feed-card.js';
import PinnedCard from './pinned-card.js';
import NetworkService from './../core/network.js';
import StorageService from './../core/storage.js';
import AppConstants from './../core/constants';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.offset = 1;
        this.state = {
            pinned_items: [],
            feed_items: []
        }
    }

    componentDidMount() {
        this.requestFeedItems();
        this.request_timer = setInterval(() => {
            this.requestFeedItems(1);
        }, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.request_timer);
    }

    requestFeedItems = (page, append) => {
        StorageService.getPinnedItem().then(p => {
            this.setState({
                pinned_items: p
            });
            let options = {
                query_params: {
                    page: page || this.offset
                }
            }
            return NetworkService.makeAPIGetRequest(AppConstants.API_BASE_URL, options);
        }).then(data => {

            if (!data || !data.response || !data.response.results){
                return this.setState({
                    feed_items: []
                })
            }

            if (append) {
                this.setState({
                    feed_items: this.state.feed_items.concat(data.response.results)
                });
            } else {
                this.setState({
                    feed_items: data.response.results
                });
            }
        }).catch(err => {
            console.log('err == ', err);
        });
    }

    renderPinnedItems = () => {
        if(!this.state.pinned_items.length)
        return null;

        return this.state.pinned_items.map((item, i) => {
            return (
                <PinnedCard
                key={i}
                updateScreen={this.props.updateScreen}
                category={item.category}
                thumbnail={item.thumbnail}
                title={item.title}
                body={item.body}
                id={item.id}
                />
            );
        });

    }

    renderFeedItems = () => {
        if(!this.state.feed_items.length)
        return null;

        return this.state.feed_items.map((item, i) => {
            return (
                <FeedCard
                key={i}
                updateScreen={this.props.updateScreen}
                category={item.sectionName}
                thumbnail={item.fields && item.fields.thumbnail}
                title={item.webTitle}
                body={item.fields && item.fields.body}
                id={item.id}
                />
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView horizontal = {true}>
            {this.renderPinnedItems()}
            </ScrollView>
            <View style={styles.feed}>
            <Text>{'The Guardian News'}</Text>
            </View>
            <ScrollView onMomentumScrollEnd={() => this.requestFeedItems(++this.offset, true)}>
            {this.renderFeedItems()}
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: responsiveHeight(2.5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    feed: {
        marginTop: responsiveHeight(1),
        backgroundColor: 'green',
        width: responsiveWidth(100),
        height: responsiveHeight(3),
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = Home;
