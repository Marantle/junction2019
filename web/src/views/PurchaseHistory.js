import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { getProductsFromReceipts } from '../store/purchaseHistory'

const Row = ({ labelName } = {}) => (
  <TableRow>
    <TableCell>{labelName.english}</TableCell>
  </TableRow>
)

export default function PurchaseHistory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsFromReceipts())
  }, [dispatch])
  const products = useSelector(state => state.purchaseHistory.products)
  
  return (
    <>
      <h1>Purchase History</h1>
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
