import {useState} from "react";
import s from "./WeatherForecast.module.scss"
import {DenseTable} from "../Table/Table";
import {selectWeatherData} from "../../../bll/selectors/weather";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Nullable} from "../../../types";
import {GeoDataType} from "../../../dal/api";
import {fetchWeatherData} from "../../../bll/reducers/weatherForecast-reducer";

type WeatherForecastProps = {
  geoData: Nullable<GeoDataType>
}

export const WeatherForecast = (props: WeatherForecastProps) => {
  const {geoData} = props
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(selectWeatherData)
  const [isTableVisible, setIsTableVisible] = useState<boolean>(false)

  const convertDateToDay = (date: number) => {
    let dateToConvert = new Date(+date * 1000);
    return dateToConvert.toLocaleString('en-us', {
      weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }

  const onButtonClick = () => {
    if (!isTableVisible) {
      setIsTableVisible(true)
    } else {
      geoData && dispatch(fetchWeatherData(geoData))
    }
  }

  return (
    <div className={s.content}>
      <p className={s.content__title}>Weather Forecast </p>
      {
        weatherData &&
        <>
            <div className={s.city}>
                <div className={s.wrap}>
                    <span className={s.city__name}>{weatherData.timezone}</span>
                    <span>{convertDateToDay(weatherData.current.dt)}</span>
                </div>
                <span className={s.city__temp}>
                {`${weatherData.current.temp > 0 ? `+${Math.floor(weatherData.current.temp)}  C` : Math.floor(weatherData.current.temp)}`}
              </span>
            </div>
            <button className={s.button} onClick={onButtonClick}>
              {isTableVisible ? "Update" : "Hourly weather"}
            </button>
          {isTableVisible && <DenseTable data={weatherData.hourly}/>}
        </>
      }
    </div>
  )
}
