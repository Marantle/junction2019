import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';

import { getProductsFromReceipts } from '../store/purchaseHistory'
import { changeView, VIEW } from '../store/view';

export default function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsFromReceipts())
  }, [dispatch])
  
  const onClick = () => {
    dispatch(changeView(VIEW.MAIN_CHOICE));
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      flex='1'
      alignItems='center'
    >
        <p style={{ textAlign: 'center', maxWidth: '300px', color: 'white' }}>
          Need help emptying your dry food cabinet? Is it the end of the month again? Want to make a change for the environment?
        </p>
        <p style={{ color: 'white' }}>
          Don't worry we got you covered!
        </p>
        <Button variant='contained' color='secondary' onClick={onClick}>
          Get cooking ideas
        </Button>
    </Box>
  )
}