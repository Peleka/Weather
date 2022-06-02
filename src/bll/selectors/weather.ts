import {AppRootStateType} from "../store";
import {WeatherForecastDataType} from "../../dal/api";
import {AppStatusType} from "../reducers/app-reducer";
import {Nullable} from "../../types";

export const selectWeatherData = (state: AppRootStateType): Nullable<WeatherForecastDataType> => state.weather.weatherData
export const selectAppStatus = (state: AppRootStateType): AppStatusType => state.app.status
export const selectAppIsInitialized = (state: AppRootStateType): boolean => state.app.isInitialized