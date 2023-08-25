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
        main: '#FFFFFF',
      },
    },
  });


export default function NavBar() {
  return (
    <>
        <div className=''>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" className='navBar' color='primary'>
                    <Toolbar >
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          Weather App
                        </Typography> 

                        {/* <BottomNavigationAction label="Home" icon={<CloudIcon  sx={{color: primary}} />} /> */}
                        
                        <Button>
                          <Link to={"/"} style={{ color: 'black', fontSize: 20, textTransform: 'capitalize', textDecoration: 'none', padding: 8 }}>
                            Home
                          </Link>
                        </Button>
                        <Button>
                          <Link to={"/cities"} style={{ color: 'black', fontSize: 20, textTransform: 'capitalize', textDecoration: 'none', padding: 8 }}>
                            Cities
                          </Link>
                        </Button> 
                        <Button>
                          <Link to={"/history"} style={{ color: 'black', fontSize: 20, textTransform: 'capitalize', textDecoration: 'none', padding: 8 }}>
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