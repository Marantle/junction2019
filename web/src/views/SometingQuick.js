import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';

import { changeView, VIEW } from '../store/view';
import ProductPicture from './foodComponent';

export default function LandingPage() {
  const someProducts = useSelector(state => state.purchaseHistory.products.slice(0, 3));
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(changeView(VIEW.MAIN_CHOICE));
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <p>We think you still have these, 
      which sounds the best right now?</p>
      {someProducts.length > 0 &&
        someProducts.map(product => (
          <ProductPicture key={product.ean} product={product}/>
        ))
      }
    </Box>
  )
}