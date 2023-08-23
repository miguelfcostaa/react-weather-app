import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const primary = grey[50];


const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1E80C1',
      },
    },
  });


export default function NavBar() {
  return (
    <>
        <div className='row'>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" className='navBar' color='primary'>
                    <Toolbar >
                        <div className='.col-12 .col-md-8'>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Weather App
                            </Typography> 
                        </div>
                        {/* <BottomNavigationAction label="Home" icon={<CloudIcon  sx={{color: primary}} />} /> */}
                        <div className='.col-6 .col-md-4'>
                            <Button color="inherit" >Home</Button>
                            <Button color="inherit" >Cities</Button> 
                            <Button color="inherit" >History</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>  
    </>
    
  );
}