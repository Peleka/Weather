import React, {useEffect, useState} from 'react';
import s from './App.module.scss';
import {WeatherForecast} from "./ui/components/WeatherForecast/WeatherForecast";
import {Loading} from "./ui/components/Loading/Loading";
import {setAppIsInitialized} from "./bll/reducers/app-reducer";
import {useAppDispatch, useAppSelector} from "./hooks";
import {selectAppIsInitialized} from "./bll/selectors/weather";
import {Nullable} from "./types";
import {GeoDataType} from "./dal/api";
import {fetchWeatherData} from "./bll/reducers/weatherForecast-reducer";

function App() {

  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectAppIsInitialized)

  const [geoData, setGeoData] = useState<Nullable<GeoDataType>>(null)

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos: any) {
      // setGeoData(pos.coords);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function getGeolocation() {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }

    getGeolocation();
  }, [])

  useEffect(() => {
    geoData && dispatch(fetchWeatherData(geoData))
    dispatch(setAppIsInitialized(true))
  }, [geoData])


  return (
    <div className={s.App}>
      <div className={s.wrap}>
        {!isInitialized
          ? <Loading/>
          : <WeatherForecast geoData={geoData}/>
        }
      </div>
    </div>
  )
}

export default App;
