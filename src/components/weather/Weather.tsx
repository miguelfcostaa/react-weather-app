import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Data from '../../types/Data.type.ts'
import { Link } from 'react-router-dom';



export default function ForecastWeather(props: any) {

        
    const [ weatherInfo, setWeatherInfo ] = useState<Data>();



    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
                  
        })();
    });


    async function getWeatherInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: props.city,
                days: 1
            }
        })
        return response.data;
    }


    return(
        <>
            <Card className='weatherCard' sx={{ boxShadow: 5, borderRadius: 2, }}>
                <CardContent className='weatherCardCont'>
                    
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold', width: 370, padding: 3 }} >
                        {weatherInfo?.location.name} 
                        <p style={{fontSize: 18, fontWeight: 'normal'}}>{weatherInfo?.location.country}</p>
                    </Typography>

                    <Typography className='currentImage'>
                        <img alt='' src={weatherInfo?.current.condition.icon} width={150} height={150} />
                    </Typography>
                    <Typography sx={{ fontSize: 24, width: 300, paddingLeft: 3 }} >
                        {weatherInfo?.current.temp_c}ºC
                    </Typography>

                    <Typography sx={{ fontSize: 24, width: 400, paddingLeft: 3 }}>
                        {weatherInfo?.current.condition.text}
                    </Typography>


                    <Typography sx={{ fontSize: 20, width: 400, padding: 3, paddingTop: 2 }} >
                        {weatherInfo?.location.localtime} 
                    </Typography>

                    
                    <Link to={"/search/" + weatherInfo?.location.name + "/days/" + 7}>
                        <Button size="medium" variant="contained" className='btnMoreInfo' sx={{marginTop: 2, borderRadius: 3, opacity: '60%' }}> More Info </Button>    
                    </Link>

                </CardContent>
            </Card>
        
        </>

    );


}
