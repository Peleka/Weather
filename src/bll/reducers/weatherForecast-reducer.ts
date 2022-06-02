import {Nullable} from "../../types";
import {GeoDataType, weatherAPI, WeatherForecastDataType} from "../../dal/api";
import {AppThunkType} from "../store";
import {setAppStatus} from "./app-reducer";

export type WeatherStateType = {
  weatherData: Nullable<WeatherForecastDataType>
}

const initialState: WeatherStateType = {
  weatherData: null
}

export const weatherReducer = (state: WeatherStateType = initialState, action: WeatherActions): WeatherStateType => {

  switch (action.type) {
    case WeatherActionTypes.SET_WEATHER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
}

export const setWeatherData = (weatherData: WeatherForecastDataType) => ({
  type: WeatherActionTypes.SET_WEATHER_DATA,
  payload: {weatherData}
} as const)

export const fetchWeatherData = (geoData: GeoDataType): AppThunkType =>
  async dispatch => {
    try {
      if (geoData) {
        dispatch(setAppStatus("loading"))
        const res = await weatherAPI.getWeather(geoData.latitude, geoData.longitude)
        dispatch(setWeatherData(res.data))
        dispatch(setAppStatus('succeeded'))
      }
    } catch (error) {
      console.log(error)
      dispatch(setAppStatus('failed'))
    }
  };

enum WeatherActionTypes {
  SET_WEATHER_DATA = "SET_WEATHER_DATA",
}

export type WeatherActions = ReturnType<typeof setWeatherData>