import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          Weather App
                        </Typography> 

                        {/* <BottomNavigationAction label="Home" icon={<CloudIcon  sx={{color: primary}} />} /> */}
                        
                        <Button sx={{color: 'white'}}>
                          <Link to={"/"}>
                            Home
                          </Link>
                        </Button>
                        <Button color="inherit">
                          <Link to={"/cities"}>
                            Cities
                          </Link>
                        </Button> 
                        <Button color="inherit">
                          <Link to={"/history"}>
                            History
                          </Link>
                        </Button>
                       
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>  
    </>
    
  );
}