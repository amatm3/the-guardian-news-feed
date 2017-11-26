import React from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';

import Home from './src/components/home.js';
import Article from './src/components/article.js';
import AppConstants from './src/core/constants.js';
import Card from './src/components/card.js'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            screens: [{
                name: AppConstants.screens.HOME,
                params: {}
            }],
        };

        this.renderers = {};
        this.renderers[AppConstants.screens.HOME] = this.renderHome;
        this.renderers[AppConstants.screens.ARTICLE] = this.renderArticle;
    }

    updateScreen = (screen, params, jump_to_screen) => {
        params = params || {};
        let screens = this.state.screens;
        if (screen == AppConstants.screens.BACK_PRESSED) {
            screens.pop();
        } else {
            if (screen == AppConstants.screens.HOME) {
                screens = [];
            }
            // removing cycles
            for (let ix = 0; ix < screens.length; ++ix) {
                if (screens[ix].name === screen) {
                    screens.splice(ix, 1);
                    break;
                }
            }

            if (!screens || !screens.length) {
                screens = [{name: screen, params: params}];
            }
            if (screens[screens.length - 1].name != screen) {
                screens.push({name: screen, params: params});
            }
        }

        this.setState({
            screens: screens
        });
    }

    updateCurrentScreenParams = (screen_name, params) => {
        if (!this.state.screens || !this.state.screens.length)  {
            return null;
        }
        let current_screen = this.state.screens[this.state.screens.length - 1];
        for (let ix = 0; ix < this.state.screens.length; ++ix) {
            if (this.state.screens[ix].name === screen_name) {
                Object.keys(params).map(k => {
                    this.state.screens[ix].params[k] = params[k];
                });
                break;
            }
        }
    }

  render() {
      let screens = this.state.screens;
      let current_screen = {
          name: AppConstants.screens.HOME,
          params: null
      };
      if (screens && screens.length) {
          current_screen = screens[screens.length - 1];
      }

      return this.renderers[current_screen.name](current_screen.params);
  }

  renderHome = (params) => {
      return (
          <Home updateScreen={this.updateScreen} updateCurrentScreenParams={this.updateCurrentScreenParams} params={params} />
      );
  }

  renderArticle = (params) => {
      return (
          <Article updateScreen={this.updateScreen} updateCurrentScreenParams={this.updateCurrentScreenParams} params={params} />
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
});
