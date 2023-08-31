import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Data from '../../types/Data.type';
import NavBar from '../NavBar';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Hour from '../../types/Hour.type';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import { icon } from "leaflet"

const ICON = icon({
  iconUrl: "/marker_map_icon.png",
  iconSize: [48, 48],
})

export default function OnlyDateWeather() {

    let params = useParams();

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    async function getWeatherInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: params.field,
                days: params.ndays ?? '1',
                dt: params.date,
                hour: params.hour ?? '',
            }
        })
        return response.data;
    }
    
    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    });


    return(
    <>
        <NavBar />
        
        <div className='flexSearchAndCurrent' >
                <Card className='afterSearchCurrentDayOnly' sx={{ boxShadow: 5, borderRadius: 2}}>
                    <CardContent className='afterSearchCurrentDayCont'>

                        <Typography>
                            <img alt='' src={weatherInfo?.forecast.forecastday[0].day.condition.icon} width={180} height={180} style={{}}/>
                        </Typography>   

                        <Typography sx={{ fontSize: 34, width: 270, padding: 3, textAlign: 'right' }} >
                            <p style={{fontWeight: 'bold'}}> {weatherInfo?.location.name} </p> 
                            {weatherInfo?.forecast.forecastday[0].day.maxtemp_c}ºC 
                            <Typography sx={{ fontSize: 28 }}>
                                {weatherInfo?.forecast.forecastday[0].day.mintemp_c}ºC
                            </Typography>
                        </Typography>

                        <Typography sx={{ fontSize: 26, width: 400, padding: 3, paddingTop: 1, paddingBottom: 4 }}>
                            {weatherInfo?.forecast.forecastday[0].day.condition.text}
                        </Typography>

                        <Typography className="humidity" sx={{ fontSize: 24, width: 220, paddingLeft: 2 }}>
                            <WaterDropIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.forecast.forecastday[0].day.daily_chance_of_rain} %
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 210, paddingLeft: 2 }} >
                            <ThermostatIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.forecast.forecastday[0].day.avgtemp_c} ºC
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 220, paddingLeft: 2 }} >
                            <AirIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.forecast.forecastday[0].day.maxwind_kph} mph
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 210, paddingLeft: 2 }} >
                            <WbSunnyIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.forecast.forecastday[0].day.uv} UV
                        </Typography>

                        
                    </CardContent>
                </Card>
                <Card className="onlyHourForecast" sx={{ fontSize: 16, boxShadow: 5, borderRadius: 2}}>
                    <CardContent className='onlyHourForecastCont' >
                        {weatherInfo?.forecast?.forecastday[0].hour.map((data: Hour) => 
                            <div className='row'>
                            
                                <Typography className='col-2' sx={{ textAlign: 'center' }}>
                                    {data.time}
                                </Typography>

                                <Typography className='col-1'>
                                    <img alt='' src={data.condition.icon} width={30} height={30} />
                                </Typography>   

                                <Typography className='col-1'>
                                    {data.temp_c}ºC
                                </Typography>

                                <Typography className='col-2'>
                                    <WaterDropIcon sx={{ verticalAlign: 'middle'}}/> {data.chance_of_rain}%
                                </Typography>

                                <Typography className='col-2'>
                                    <ThermostatIcon sx={{ verticalAlign: 'middle'}}/> {data.feelslike_c}ºC
                                </Typography>

                                <Typography className='col-2'>
                                    <AirIcon sx={{ verticalAlign: 'middle'}}/> {data.wind_kph}km/h
                                </Typography>

                                <Typography className='col-2' sx={{  paddingBottom: 2}} >
                                    <WbSunnyIcon sx={{ verticalAlign: 'middle'}}/>  {data.uv}UV
                                </Typography>

                            </div>   
                        )}     
                    </CardContent>
                </Card>
        </div>
        <div className='flexMap'>
            {weatherInfo && (
                <MapContainer
                className="full-height-map"
                center={[Number(weatherInfo?.location.lat),Number(weatherInfo?.location.lon)]}
                zoom={9}
                minZoom={3}
                maxZoom={19}
                maxBounds={[[-85.06, -180], [85.06, 180]]}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[Number(weatherInfo?.location.lat),Number(weatherInfo?.location.lon)]} icon={ICON} >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            )}    
            
            </div>
              
    </>
    );
}
