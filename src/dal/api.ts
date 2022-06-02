import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
})

const apiKey = 'ed6683c227f77f1adba2a5e8d52affc1'

export const weatherAPI = {
  getWeather(lat: string, lon: string, part: string = "daily") {
    return instance.get(`onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=metric`)
  },
  getWeatherByCityName(cityName: string) {
    return instance.get(`weather?q=${cityName}&appid=${apiKey}`)
  }
}

export type CurrentWeatherType = {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_deg: number,
  wind_gust: number,
  weather: WeatherType[]
}
export type WeatherType = {
  id: number,
  main: string,
  description: string,
  icon: string
}

export type HourlyWeatherType =
  {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: WeatherType[],
    "pop": number
  }

export type WeatherForecastDataType = {
  current: CurrentWeatherType,
  lat: number,
  lon: number,
  timezone: string,
  hourly: HourlyWeatherType[]
}

export type GeoDataType = {
  latitude: string;
  longitude: string;
}