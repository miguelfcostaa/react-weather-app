import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

export default function searchField() {
  return (
    <>
        <Box sx={{marginTop: 5, marginLeft: 35}}>
            <TextField
                id="filled-search"
                label="Search location..."
                type="search"
                variant="filled"
                className='searchField'
            />
            <IconButton aria-label="search" sx={{marginTop: 1}}>
                <SendIcon />
            </IconButton>
         
        </Box>
    </>
    );
}