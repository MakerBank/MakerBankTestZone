import * as React from 'react';
//import { useState, useEffect } from 'react';
import { Navigate} from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared';
import GoogleLoginButton from 'react-google-login-button'

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import imagemFundo from '../../image/imagemFundo.jpg'
import logoMaker from '../../image/LogoMaker.png'
import {supabase} from '../../components/client.js'

export default function Login({isAuthorized}) {
  //const navigate = useNavigate();

  console.log("oi")

  const login = async () => {
    supabase.auth.signInWithOAuth({provider: 'google'})
  }

  if (isAuthorized === true) {
    const returnPathname = localStorage.getItem("lastPage") || "/saldo";
    localStorage.removeItem("lastPage");
    return(
      <Navigate to={returnPathname} replace></Navigate>
    );
  }

    return (
        <Container disableGutters sx={{overflow:'hidden', minHeight:657, height:'100vh',  bgcolor:'#020e1e'}} maxWidth={false} >
            <Grid container spacing={0} sx={{height:'100%'}}>
                <Grid xs={12} md="auto" sx={{width:'100%',minWidth:5/12, height:'100%',textAlign:"center", overflow:"hidden"}}>
                    <Grid justifyContent="center" alignItems="center" container spacing={0} sx={{height:'45%', width:'100%', overflow:"hidden"}}>
                        <Grid xs={0} md={12} sx={{display:{xs:'none',md:'block'}, height:'100%', width:'100%'}}>
                            <img src={logoMaker} alt="logoMaker" style={{ height: '100%', width: 'auto', margin:"8px"}}/>   
                        </Grid>
                        <Grid xs={12} md={0} sx={{display:{xs:'block',md:'none'}, height:'100%', width:'100%'}}>
                            <img src={logoMaker} alt="logoMaker" style={{ height: 'auto', width: '100%', maxWidth:525, padding:"8px", boxSizing:"border-box"}}/>   
                        </Grid>
                    </Grid>
                    <Box sx={{width:'100%',height:"5%"}}/>
                    <Container sx={{width:'360px',height:"35%"}}>
                    <Auth supabaseClient={supabase}
                        appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                fontSizes: {
                                    baseButtonSize: '3vh',
                                },
                                space: {
                                    buttonPadding: '1vh 0.4vh',
                                },
                            },
                        },
                        }}
                        theme="dark"
                        providers={["google"]}
                        redirectTo='https://https://makerbank.netlify.app/login'
                        onlyThirdPartyProviders={true}> 
                        
                    </Auth>
                    <GoogleLoginButton
                        width={140}
                        height={40}
                        longTitle={false}
                        theme="light"
                    >   
                    <Button onClick={() => login}/>
                    </GoogleLoginButton>
                    </Container>
                    <Box sx={{width:'100%',height:"15%"}}/>
                </Grid>
                <Grid xs={0} md sx={{height:'100%'}}>
                    <img src={imagemFundo} alt="backGround" height='100%' width="auto"/>
                </Grid>
            </Grid>
        </Container>
        );
}

