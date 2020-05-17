import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import settingsReducer from "./pages/settings/SettingsReducer";
import recommendsReducer from "./pages/recommends/RecommendsReducer";
import { setUserData } from "./pages/settings/SettingsActions";

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            settings: settingsReducer,
            recommends: recommendsReducer, 
        }),
        {},
        compose(applyMiddleware(thunk))
    );

    let user_data = localStorage.getItem("userdata");
    if (user_data) user_data = JSON.parse(user_data);
    
    store.dispatch(setUserData(user_data));
    return store;
}