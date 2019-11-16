import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const Row = ({ labelName } = {}) => (
  <TableRow>
    <TableCell>{labelName.english}</TableCell>
  </TableRow>
)

export default function PurchaseHistory() {
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
