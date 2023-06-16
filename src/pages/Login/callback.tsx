import * as React from 'react';
import { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import {supabase} from '../../components/client.js'

export default function Callback() {
    const logout = async() =>{  
        await supabase.auth.signOut()
    }

return (
     <Container disableGutters sx={{overflow:'hidden', minHeight:657, height:'100vh'}} maxWidth={false}>
            <h1>oi</h1>
                                <Button onClick={() => logout()}>

                    </Button>
     </Container>
    );

}




