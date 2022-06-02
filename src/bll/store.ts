import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppActions, appReducer} from "./reducers/app-reducer";
import {WeatherActions, weatherReducer} from "./reducers/weatherForecast-reducer";


const rootReducer = combineReducers({
  app: appReducer,
  weather: weatherReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppRootActionType = AppActions | WeatherActions

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionType>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, void, AppRootActionType>;
