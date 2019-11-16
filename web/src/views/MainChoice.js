import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';

import { changeView, VIEW } from '../store/view';

const SelectionButton = ({ children, ...props }) => (
  <Button variant='contained' color='secondary' {...props}>
    <Box style={{ maxWidth: '220px' }}>{children}</Box>
  </Button>
);

export default function LandingPage() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(changeView(VIEW.SOMETHING_QUICK));
  }

  return (
    <Box style={{
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>
      <p style={{ color: 'white' }}>Select option that fits your situation</p>
      <SelectionButton onClick={onClick}>
        I need to cook something quick
      </SelectionButton>
      <SelectionButton disabled>
        I could get something from the corner shop
      </SelectionButton>
      <SelectionButton disabled>
        Something's about to expire
      </SelectionButton>
      <SelectionButton disabled>
        I want variation and healthier food
      </SelectionButton>
    </Box>  
  )
}