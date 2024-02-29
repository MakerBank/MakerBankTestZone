import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import Sidebar from './components/Sidebar.tsx';
import OrderTable from './components/OrderTable.tsx';
import OrderList from './components/OrderList.tsx';
import Header from './components/Header.tsx';
import { useState, useEffect} from 'react';
import {supabase} from '../.././components/client.js';

export default function Saldo() {
  const [rows,setRows] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      let {data, error} = await supabase.from('Transacoes').select()
      if(data!=undefined){
        if (data[0] != undefined) {
          let listOfTransactions = data.reduce(function (result, element) {
            const arrayCandidatos: any = {};
            arrayCandidatos.transaction = element.Transacao;
            const testeString = (new Date(element.Hora)).toISOString()
            arrayCandidatos.date = testeString;
            result.push(arrayCandidatos);
            return result;
          }, []);
          setRows(listOfTransactions);
        }
      }
    }
    )()
  }, []);

  useEffect(() => {
    (async () => {
      let {data, error} = await supabase.from('SaldoAluno').select()
      if(data!=undefined){
        if(data[0]!=undefined){
          setBalance(data[0].Saldo)
        }
      }
    }
    )()
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100%', minHeight:'300px'}}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100%',
            gap: 1,
          }}
        >
          {/*<Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Orders
              </Typography>
            </Breadcrumbs>
          </Box>*/}
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Histórico de transações
            </Typography>
            <IconButton>
              Saldo total: {balance}
            </IconButton>
          </Box>
          <OrderTable rows={rows}/>
          <OrderList rows={rows}/>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}