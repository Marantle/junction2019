import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { getProductsFromReceipts } from '../store/purchaseHistory'
import ProductPicture from './foodComponent'

const Row = ({ name } = {}) => (
  <TableRow>
    <TableCell>{name}</TableCell>
  </TableRow>
)

export default function PurchaseHistory() {
  // await dispatch(getProductsFromReceipts())
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsFromReceipts())
  }, [dispatch])
  const products = useSelector(state => state.purchaseHistory.products)
  const items = [{ name: 'RagettiSpagetti'}];
  return (
    <>
      <h1>Purchase History</h1>
      {/* <ProductPicture picture={products[0]}/> */}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, i) => <Row key={i} {...item} />)}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
