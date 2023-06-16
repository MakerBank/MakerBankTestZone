import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


//import DataGrid from 'react-data-grid';

import imagemFundo from '../../image/imagemFundo.jpg'
import logoMaker from '../../image/LogoMaker.png'
import {supabase} from '../../components/client.js'

export default function Saldo() {
    const [rows,setRows] = useState([])
    const columns: GridColDef[] = [
    { field: 'id', headerName: 'Data e hora', type: 'dateTime', flex: 3, hideable: false, valueGetter: ({ value }) => value && new Date(value)},
    { field: 'transaction', headerName: 'Total', flex: 1 , hideable: false }
    ];

    /*const columns = [
    { key: 'id', name: 'Data e hora'},
    { key: 'transaction', name: 'Total'}];*/

    useEffect(() => {
        const teste = async() =>{  
        const dado = await supabase.from('Transacoes')
  .select('*')
        const arrayInicial = []
        console.log(typeof(dado.data))
        const listOfRelatorios = dado.data.reduce(function(result,element) {
          const arrayRelatorio = {};
          arrayRelatorio.id = Date.parse(element.Hora);
          arrayRelatorio.transaction = element.Transacao;
          result.push(arrayRelatorio)
          return result;
        }, arrayInicial);

        setRows(listOfRelatorios)
        }
        teste()
    }, [])


    const logout = async() =>{  
        await supabase.auth.signOut()
    }

    return (
        <Container disableGutters sx={{overflow:'hidden', minHeight:657, height:'100vh',  bgcolor:'#020e1e'}} maxWidth={false} >
            <Grid container spacing={0} sx={{height:'100%'}}>
                <Grid xs={0} md sx={{height:'100%', textAlign:"center", overflow:"hidden",display:{xs:'none',md:'block'}}}>
                    <Grid xs={0} md={12} sx={{display:{xs:'none',md:'block'}, height:'40%', width:'100%'}}>
                            <img src={logoMaker} style={{ height: 'auto', width: '100%', maxWidth:'100%', padding:"8px", boxSizing:"border-box"}}/>   
                    </Grid>
                    <Box sx={{width:'100%',height:"5%"}}/>
                    <Container sx={{width:'100%',height:"35%"}}>
                    <Button sx={{fontSize:"10vh"}} onClick={() => logout()}>Logout</Button>
                    </Container>
                    <Box sx={{width:'100%',height:"15%"}}/>
                </Grid>
                <Grid xs={12} md='auto' sx={{minWidth:"55wh", maxWidth:'70wh', width:'100%' ,height:'100%',padding:"8px", boxSizing:"border-box"}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        //rowsPerPageOptions={[5, 10, 20]}
                        sx={{ fontSize:"2vh",width:'100%',color:'white', borderColor: 'white',
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '2.2vh' }}}
                        disableRowSelectionOnClick
                        getRowHeight={() => 'auto'}
                    />
                </Grid>
            </Grid>
        </Container>
        );
}
/*<DataGrid
                        rows={rows}
                        columns={columns}
                        //rowsPerPageOptions={[5, 10, 20]}
                        sx={{ fontSize:"2vh",width:'100%',color:'white', borderColor: 'white',
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '2.2vh' }}}
                        disableRowSelectionOnClick
                        getRowHeight={() => 'auto'}
                        columnHeaderHeight={300}
                    />*/
