import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Weather from "./weather/Weather.tsx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs, { Dayjs } from 'dayjs';
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { Card } from '@mui/material';


export default function SearchField(props: any) {

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
      }


    const [ searchField, setSearchField ] = useState(props?.city ?? "");

    const [ selectedDate, setSelectedDate ] = useState<Dayjs | null>(dayjs(getDate()));

    const [ selectedDays, setSelectedDays ] = useState('');

    const [ selectedHour, setSelectedHour ] = useState('');

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
                dt: selectedDate,
                hour: selectedHour
            }
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
    }


    return (
    <>  

        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Box sx={{marginTop: 5, marginLeft: 35, boxShadow: 5, borderRadius: 4 }} className='searchBox'>
                <input 
                    id="field" 
                    className='searchField' 
                    placeholder='Search a Location...'
                    value={searchField}
                    onChange={onChangeSearch}
                />
                
                <IconButton aria-label="search" onClick={findByField}>
                    <Link to={'/search/' + searchField + '/' + selectedDate + '/' + selectedHour + '/' + selectedDays }>
                        <SendIcon />
                    </Link>
                </IconButton>
            </Box>
            
            <Weather city="London" />
        </div>

        <Box className="whitebox"  sx={{ boxShadow: 5, borderRadius: 4 }}>  </Box>

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
            > 
                <MenuItem value="">
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
        
    </>
    );
}