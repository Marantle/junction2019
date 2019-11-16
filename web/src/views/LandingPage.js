import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Box, Button } from '@material-ui/core';

import { changeView, VIEW } from '../store/view';

export default function LandingPage() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(changeView(VIEW.PURCHASE_HISTORY));
  }

  return (
    <Box bgcolor={'secondary.main'} display='flex' flexDirection='column' height='100%'>
      <Paper style={{ flex: '1', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
        <p style={{ textAlign: 'center', maxWidth: '300px' }}>
          Need help emptying your dry foods cabinet? Is it the end of the month again? Want to make a change for the environment?
        </p>
        <p>
          Don't worry we got you covered
        </p>
        <Button variant='contained' color='secondary' onClick={onClick}>
          Get cooking ideas
        </Button>
      </Paper>
    </Box>
  )
}