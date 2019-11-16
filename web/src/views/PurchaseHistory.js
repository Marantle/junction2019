import React from 'react';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import getProductsFromReceipts from '../store/purchaseHistory'

const Row = ({ name } = {}) => (
  <TableRow>
    <TableCell>{name}</TableCell>
  </TableRow>
)

export default async function PurchaseHistory() {
  // await dispatch(getProductsFromReceipts())
  getProductsFromReceipts()
  console.log("-----------")
  const items = [{ name: 'RagettiSpagetti'}];

  return (
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
  );
}
