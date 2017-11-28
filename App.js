import React from 'react';

import Home from './src/components/home.js';
import Article from './src/components/article.js';
import AppConstants from './src/core/constants.js';

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

    updateScreen = (screen, params) => {
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
            <Home updateScreen={this.updateScreen} params={params} />
        );
    }

    renderArticle = (params) => {
        return (
            <Article updateScreen={this.updateScreen} params={params} />
        );
    }

}
