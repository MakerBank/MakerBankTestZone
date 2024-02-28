/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useState, useEffect} from 'react';
import {supabase} from '../../.././components/client.js';


type Order = 'asc' | 'desc';

export default function OrderTable() {
  const [orderByDate, setOrderByDate] = useState(true);
  const [orderByQnt, setOrderByQnt] = useState(false);
  const [rows,setRows] = useState([]);
  const [order, setOrder] = React.useState<Order>('desc');
  
  function sortArray(rows,orderByDate,orderByQnt,order){
    if(rows.length === 0) return rows
    var sortedArray = structuredClone(rows)
    if(orderByDate===true){
      sortedArray.sort((a,b) => Date.parse(a.date)-Date.parse(b.date))
    }
    if(orderByQnt===true){
      sortedArray.sort((a,b)=>a.transaction-b.transaction)
    }
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", options);
    sortedArray.forEach(element => {
      element.date = (dateTimeFormat.format(Date.parse(element.date)))
    });
    if(order==='asc'){
      return sortedArray
    } else{
      return sortedArray.reverse()
    }
  }

  useEffect(() => {
    (async () => {
      let {data, error} = await supabase.from('Transacoes').select()
      console.log(data)
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

 

  function setPage(typeOfOrder:string){
    if(orderByQnt === true && typeOfOrder==="byQnt"){
      setOrder(order==='desc' ? 'asc' : 'desc')
    }
    else if(orderByDate === true && typeOfOrder==="byDate"){
      setOrder(order==='desc' ? 'asc' : 'desc')
    }
    else if(orderByQnt === false && typeOfOrder==="byQnt"){
      setOrder('desc')
      setOrderByDate(false)
      setOrderByQnt(true)
    }
    else if(orderByDate === false && typeOfOrder==="byDate"){
      setOrder('desc')
      setOrderByQnt(false)
      setOrderByDate(true)
    }
  }

  const returnIconByDate = orderByDate ? <ArrowDropDownIcon/> : "";
  const returnIconByQnt = orderByQnt ? <ArrowDropDownIcon/> : "";

  return (
    <React.Fragment>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 120, padding: '12px 6px 12px 20px' }}>
                <Link
                  underline="none"
                  color="neutral"
                  component="button"
                  onClick={() => setPage("byDate")}
                  fontWeight="lg"
                  endDecorator={returnIconByDate}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Data e horário 
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="neutral"
                  component="button"
                  onClick={() => setPage("byQnt")}
                  fontWeight="lg"
                  endDecorator={returnIconByQnt}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                > Quantidade
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortArray(rows,orderByDate,orderByQnt,order).map((row) => (
              <tr>
                <td style={{paddingRight: '6px',paddingLeft:'20px' }}>
                  <Typography level="body-xs">{row.date}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.transaction}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}