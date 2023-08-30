import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Weather from "./weather/Weather.tsx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Dayjs } from 'dayjs';
import { Button, Input } from '@mui/joy';


export default function SearchField(props: any) {


    const [ searchField, setSearchField ] = useState(props.city ?? "");

    const [ selectedDate, setSelectedDate ] = useState<Dayjs | null | any>();

    const [ selectedDays, setSelectedDays ] = useState('0');

    const [ selectedHour, setSelectedHour ] = useState('');

    const month = selectedDate?.get('M') + 1;


    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchField = e.target.value;
        setSearchField(searchField);
    };

    const onChangeDays = (event: SelectChangeEvent) => {
        setSelectedDays(event.target.value);
    };

    const onChangeHour = (event: SelectChangeEvent) => {
        setSelectedHour(event.target.value);
    };


    const findByField = () => {
        axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: searchField,
                days: selectedDays,
                dt: selectedDate?.get('y') + "-" + month + "-" + selectedDate?.get('D'),
                hour: selectedHour
            }
        })
        .then((response) => {
            const location = JSON.parse(localStorage.location)
            location.push(response.data.location.name) 
            localStorage.setItem("location", JSON.stringify(location))

            const country = JSON.parse(localStorage.country)
            country.push(response.data.location.country) 
            localStorage.setItem("country", JSON.stringify(country))

            const localtime = JSON.parse(localStorage.localtime)
            localtime.push(selectedDate?.get('y') === undefined ? response.data.forecast.forecastday[0].date + (selectedHour ? " - " + selectedHour + ":00" : "") : selectedDate?.get('y') + "-" + month + "-" + selectedDate?.get('D') + (selectedHour ? " - " +  selectedHour + ":00" : "")) 
            localStorage.setItem("localtime", JSON.stringify(localtime))

            const temperature = JSON.parse(localStorage.temperature)
            temperature.push(response.data.current.temp_c) 
            localStorage.setItem("temperature", JSON.stringify(temperature))
            return response.data;
        })
    }

    return (
    <>  
        <Box className="whitebox"  sx={{ boxShadow: 5, borderRadius: 2 }}>  </Box>

        <form onSubmit={(event) => {
            event.preventDefault();
        }}>
            <div className='row' style={{ marginRight: 0 }} >
                <div className='col-6'>
                    <Box sx={{ boxShadow: 5, borderRadius: 2 }} className='searchBox'>
                        <Input 
                            type='text'
                            id="field" 
                            className='searchField' 
                            placeholder='Search a Location...'
                            value={searchField}
                            onChange={onChangeSearch}
                            variant="plain"
                            size="lg"
                            required
                        />
                        <Link 
                            to={ '/search/' + searchField + (selectedDate?.get('y') === undefined ? "/days" : "/" + (selectedDate?.get('y') + "-" + month +"-" + selectedDate?.get('D')) ) + (selectedDays==="0" ? "" : '/' + selectedDays) + (selectedHour ? "/hour/" + selectedHour : "") }
                            style={{color: 'black'}}
                            className='searchButton'
                        > 
                            <Button 
                                className='searchButton' 
                                startDecorator= {<SendIcon sx={{ verticalAlign: 'center'}} className='searchButton' />} 
                                sx={{"&.Mui-disabled": { pointerEvents: "unset", cursor: 'not-allowed'}}} 
                                type="submit" 
                                variant="plain" 
                                disabled={searchField==="" ? true : false}
                                onClick={findByField}
                            />
                        </Link>
                    </Box>
                    <Box className="datePicker" >
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker
                                format='YYYY-MM-DD'
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                sx={{background: 'white', borderColor: '2'}}     
                                                 
                            />
                        </LocalizationProvider>
                    </Box>

                    <FormControl className="selectDays">
                        <Select 
                            sx={{background: 'white'}}
                            value={selectedDays}
                            onChange={onChangeDays}
                            displayEmpty
                            disabled={selectedDate ? true : false}
                        > 
                            <MenuItem value={0}>
                                <em>Nº of days</em>
                            </MenuItem>
                            <MenuItem value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={4}>Four</MenuItem>
                            <MenuItem value={5}>Five</MenuItem>
                            <MenuItem value={6}>Six</MenuItem>
                            <MenuItem value={7}>Seven</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="selectHour" >
                        <Select 
                            sx={{background: 'white'}}
                            value={selectedHour}
                            onChange={onChangeHour}
                            displayEmpty
                        > 
                            <MenuItem value="">
                                <em>Select Hour</em>
                            </MenuItem>
                            <MenuItem value={0}>00:00</MenuItem>
                            <MenuItem value={1}>01:00</MenuItem>
                            <MenuItem value={2}>02:00</MenuItem>
                            <MenuItem value={3}>03:00</MenuItem>
                            <MenuItem value={4}>04:00</MenuItem>
                            <MenuItem value={5}>05:00</MenuItem>
                            <MenuItem value={6}>06:00</MenuItem>
                            <MenuItem value={7}>07:00</MenuItem>
                            <MenuItem value={8}>08:00</MenuItem>
                            <MenuItem value={9}>09:00</MenuItem>
                            <MenuItem value={10}>10:00</MenuItem>
                            <MenuItem value={11}>11:00</MenuItem>
                            <MenuItem value={12}>12:00</MenuItem>
                            <MenuItem value={13}>13:00</MenuItem>
                            <MenuItem value={14}>14:00</MenuItem>
                            <MenuItem value={15}>15:00</MenuItem>
                            <MenuItem value={16}>16:00</MenuItem>
                            <MenuItem value={17}>17:00</MenuItem>
                            <MenuItem value={18}>18:00</MenuItem>
                            <MenuItem value={19}>19:00</MenuItem>
                            <MenuItem value={20}>20:00</MenuItem>
                            <MenuItem value={21}>21:00</MenuItem>
                            <MenuItem value={22}>22:00</MenuItem>
                            <MenuItem value={23}>23:00</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='col-6'>
                    <Weather city="Funchal" />
                </div>
                
            </div>     
        </form>
    </>
    );
}