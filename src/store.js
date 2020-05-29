import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import settingsReducer from "./pages/settings/SettingsReducer";
import recommendsReducer from "./pages/recommends/RecommendsReducer";
import favoritesReducer from "./pages/favorites/FavoritesReducer";
import searchReducer from "./pages/search/SearchReducer";
import snackReducer from "./layouts/snackbar/SnackReducer";
import { setUserData, getCategories, categoryNotPrecached } from "./pages/settings/SettingsActions";

export const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combineReducers({
            settings: settingsReducer,
            recommends: recommendsReducer,
            favorite: favoritesReducer,
            search: searchReducer,
            snack: snackReducer, 
        }),
        {},
        composeEnhancers(applyMiddleware(thunk))
    );

    let user_data = localStorage.getItem("userdata");
    const precached = localStorage.getItem("precached");
    // const precached = true

    if (user_data)
        user_data = JSON.parse(user_data);

    if (!precached) {
        //if not precached, wait for the service worker to send serviceworker done message
        //then request category data to be cached
        store.dispatch(categoryNotPrecached())
        const msgListener = window.addEventListener("message", evt => {
            if (evt.data === "serviceworker done") {
                store.dispatch(getCategories());
                localStorage.setItem("precached", JSON.parse(true));
                window.removeEventListener("message", msgListener);
            }

        })
    }



    store.dispatch(setUserData(user_data));
    return store;
}