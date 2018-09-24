import { ADD_FAVORITE, REMOVE_FAVORITE, RESET_STORE } from './actionTypes';

function addFavorite(repo) {
    return {
        type: ADD_FAVORITE,
        repo,
    };
}

function removeFavorite(repo) {
    return {
        type: REMOVE_FAVORITE,
        repo,
    };
}

function resetStore() {
    return {
        type: RESET_STORE,
    };
}

export {
    addFavorite,
    removeFavorite,
    resetStore,
};

