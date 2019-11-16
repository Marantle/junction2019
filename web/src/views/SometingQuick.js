import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import { changeView, VIEW } from '../store/view';
import { toggleSelectedProduct } from '../store/purchaseHistory';

export default function LandingPage() {
  const someProducts = useSelector(state => Array.from(state.purchaseHistory.products).reverse().slice(0, 4));
  const dispatch = useDispatch();
  const onClick = (product) => {
    dispatch(toggleSelectedProduct(product));
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <p>We think you still have these, 
      which sounds the best right now?</p>
      <GridList cellHeight={180} style={{ width: 500, height: 400 }}>
        {someProducts.map(product => (
          <GridListTile key={product.ean} onClick={() => onClick(product)} style={{ mouse: ''}}>
              <img key={product.ean} src={product.pictureUrls[0].original} alt={product.ean} />
              <GridListTileBar
                title={product.labelName.english}
              />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  )
}