import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { changeView, VIEW } from '../store/view';
import { toggleSelectedProduct } from '../store/purchaseHistory';

export default function SelectIngridients() {
  const someProducts = useSelector(state => Array.from(state.purchaseHistory.products).reverse().slice(0, 4));
  const selectedProducts = useSelector(state => state.purchaseHistory.selectedProducts);
  const dispatch = useDispatch();
  const onProductSelect = (product) => {
    dispatch(toggleSelectedProduct(product));
  }
  const onNext = () => {
    dispatch(changeView(VIEW.RECIPE_SELECTION));
  }

  const isSelected = (product) => selectedProducts.some(p => p.ean === product.ean);

  return (
    <Box display='flex' flexDirection='column' alignItems='center' marginLeft='0.5em' marginRight='0.5em'>
      <p style={{ color: '#FFF' }}>We think you still have these, 
      which sounds the best right now?</p>
      <GridList cellHeight={180} cols={2} >
        {someProducts.map(product => (
          <GridListTile key={product.ean} onClick={() => onProductSelect(product)} style={{ mouse: ''}}>
              <img key={product.ean} src={product.pictureUrls[0].original} alt={product.ean} />
              <GridListTileBar
                title={product.labelName.english}
                actionIcon={isSelected(product) && <CheckCircleIcon style={{ color: '#FFF', margin: '0.2em'}}/>}
              />
          </GridListTile>
        ))}
      </GridList>
      <Button
        style={{ margin: '1em' }}
        size='large'
        variant='contained'
        color='secondary'
        disabled={selectedProducts.length === 0}
        onClick={onNext}
      >
        Next
      </Button>
    </Box>
  )
}