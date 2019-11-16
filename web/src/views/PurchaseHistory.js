import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { getProductsFromReceipts } from '../store/purchaseHistory'

const Row = ({ name } = {}) => (
  <TableRow>
    <TableCell>{name}</TableCell>
  </TableRow>
)

export default function PurchaseHistory() {
  // await dispatch(getProductsFromReceipts())
  const dispatch = useDispatch();
  dispatch(getProductsFromReceipts());
  console.log("-----------")
  const items = [{ name: 'RagettiSpagetti'}];

  return (
    <>
      <h1>Pruchase History</h1>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => <Row key={i} {...item} />)}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
