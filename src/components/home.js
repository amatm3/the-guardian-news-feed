
import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Platform} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import Card from './card.js';
import NetworkService from './../core/network.js';
import StorageService from './../core/storage.js';
import AppConstants from './../core/constants';

var count= 0;

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.offset = 0;
        this.state = {
            pinned_items: [],
            feed_items: []
        }
    }

    componentDidMount() {
        this.requestFeedItems();
        setInterval(() => {
            this.requestFeedItems(1);
        }, 30000);
    }

    requestFeedItems = (page) => {
        StorageService.getPinnedItem().then(p => {
            console.log('StorageService p == ', p);
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
            this.setState({
                feed_items: data.response.results
            });
        }).catch(err => {
            console.log('err == ', err);
        });
    }


    renderPinnedItems = () => {
        if(!this.state.pinned_items.length)
            return null;

            return this.state.feed_items.map((item, i) => {
                return (
                    <Card
                        key={i}
                        updateScreen={this.props.updateScreen}
                        category={item.sectionName}
                        thumbnail={item.fields && item.fields.thumbnail}
                        title={item.webTitle}
                        body={item.fields && item.fields.body}
                        id={item.id}
                    />
                )
            });
    }

    renderFeedItems = () => {
        if(!this.state.feed_items.length)
            return null;

        return this.state.feed_items.map((item, i) => {
            return (
                <Card
                    key={i}
                    updateScreen={this.props.updateScreen}
                    category={item.sectionName}
                    thumbnail={item.fields && item.fields.thumbnail}
                    title={item.webTitle}
                    body={item.fields && item.fields.body}
                    id={item.id}
                />
            )
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal = {true } style={styles.pinned_view}>
                    {this.renderPinnedItems()}
                </ScrollView>
                <ScrollView>
                    {this.renderFeedItems()}
                </ScrollView>
                <Text> News </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinned_view: {

  }
});

export default Home;
