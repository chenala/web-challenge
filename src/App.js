import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './App.css';
import Header from './components/header/header';
import Search from './components/search/search';
import FavoriteRepo from './components/favoriteRepo/favoriteRepo';
import favoriteReducer from './store/reducers/favoriteReducer';

const store = createStore(favoriteReducer);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>
                <Header />
                <div className='content-container'>
                    <Search />
                    <FavoriteRepo />
                </div>
            </div>
        </Provider>
    );
  }
}

export default App;
