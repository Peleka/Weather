import React from 'react';
import {HourlyWeatherType, WeatherType} from "../../../dal/api";
import s from './Table.module.scss'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Loading} from "../Loading/Loading";
import {selectAppStatus} from "../../../bll/selectors/weather";
import {useAppSelector} from "../../../hooks";

type TablePropsType = {
  data: HourlyWeatherType[]
}
export const DenseTable = (props: TablePropsType) => {
  const {data} = props
  const status = useAppSelector(selectAppStatus)

  const convertDataToHours = (date: number) => {
    let dateToConvert = new Date(date * 1000);
    return dateToConvert.toLocaleString('en-us',
      {
        hour: 'numeric',
        minute: 'numeric'
      })
  }

  const tableBody = data.map((row, index) => (
    <TableRow
      key={index}
      sx={{
        '&:last-child td, &:last-child th': {border: 0},
        fontSize: 12,
        fontFamily: 'Open Sans'
      }}
    >
      <TableCell component="th" scope="row">
        <h5>{convertDataToHours(row.dt)}</h5>
      </TableCell>
      <TableCell align="right"><h5>{`${Math.round(row.temp)} ℃`}</h5></TableCell>
      <TableCell align="right">
        {row.weather.map((el: WeatherType, index: number) => {
          return <div key={index}>
            <img style={{width: 60, height: 60}} src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                 alt={'icon'}/>
          </div>
        })}
      </TableCell>
    </TableRow>
  ))

  return (
    <TableContainer component={Paper} className={s.Table}>
      {status === 'loading' && <div className={s.preloader_container}>
          <Loading/>
      </div>}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><span className={s.table_title}>Time</span></TableCell>
            <TableCell align="center"><span className={s.table_title}>Temp</span></TableCell>
            <TableCell align="center"><span className={s.table_title}>Description</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
