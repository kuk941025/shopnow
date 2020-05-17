import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import settingsReducer from "./pages/settings/SettingsReducer";

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            settings: settingsReducer,
        }),
        {},
        compose(applyMiddleware(thunk))
    );

    return store;
}