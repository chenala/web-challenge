import { ADD_FAVORITE, REMOVE_FAVORITE, RESET_STORE } from '../actions/actionTypes';

function favoriteReducer(state = null, action) {
    const newFavoriteObj = state ? Object.assign({}, state) : {};
    
    switch (action.type) {
        case REMOVE_FAVORITE:
            delete newFavoriteObj[action.repo.name];
            return newFavoriteObj;
        case ADD_FAVORITE:
            newFavoriteObj[action.repo.name] = Object.assign({}, action.repo);
            return newFavoriteObj;
        case RESET_STORE:
            return null;
        default:
            return (newFavoriteObj || null);
    }
}

export default favoriteReducer;
