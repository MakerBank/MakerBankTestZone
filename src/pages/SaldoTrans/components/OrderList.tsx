/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useState, useEffect} from 'react';




export default function OrderList(rows) {
  const [page,setPage] = useState(0)
  const [isLastPage,setIsLastPage] = useState(false)
  const [isFirstPage,setIsFirstPage] = useState(true)
  const numberPerPage = 10

  useEffect(() => {
    console.log(rows.rows.length)
    if(rows.rows.length===0) return;
    if(rows.rows.length>=1){
      setPage(1)
      setIsLastPage(false)
    }
    if(Math.ceil(rows.rows.length/numberPerPage)==1){
      setIsLastPage(true)
    } 
  }, [rows]);

  function returnArray(){
    console.log(rows.rows.length)
    console.log(page)
    if(rows.rows?.length === 0) return [];
    console.log(rows.rows)
    var sortedArray = structuredClone(rows.rows.slice((page-1)*numberPerPage,(page)*numberPerPage))
    console.log(sortedArray)
    sortedArray.sort((a,b) => Date.parse(a.date)-Date.parse(b.date))
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
    return sortedArray.reverse()
  }
  
  function lastPage(){
    if(page==2){
      setIsFirstPage(true)
    }
    setPage(page-1)
    setIsLastPage(false)
  }

  function nextPage(){
    if(page+1==Math.ceil(rows.rows.length/numberPerPage)){
      setIsLastPage(true)
    }
    setPage(page+1)
    setIsFirstPage(false)
  }


  
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {returnArray().map((listItem) => (
        <List
          key={listItem.date}
          size="sm"
          sx={{
            '--ListItem-paddingX': 0,
          }}
        >
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
              <ListItemDecorator>
                <Avatar size="md">{listItem.transaction}</Avatar>
              </ListItemDecorator>
              <div>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                    height:40
                  }}
                >
                  <Typography level="body-xs">{listItem.date}</Typography>
                </Box>
              </div>
            </ListItemContent>
            {/*<Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Paid: <CheckRoundedIcon />,
                  Refunded: <AutorenewRoundedIcon />,
                  Cancelled: <BlockIcon />,
                }[listItem.status]
              }
              color={
                {
                  Paid: 'success',
                  Refunded: 'neutral',
                  Cancelled: 'danger',
                }[listItem.status] as ColorPaletteProp
              }
            >
              {listItem.status}
            </Chip>*/}
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
      >
        <IconButton
          onClick={()=>lastPage()}
          disabled={isFirstPage}
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page {page} of {Math.ceil(rows.rows.length/numberPerPage)}
        </Typography>
        <IconButton
          onClick={()=>nextPage()}
          disabled={isLastPage}
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}