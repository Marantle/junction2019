import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { getProductsFromReceipts } from '../store/purchaseHistory'
import receiptData from '../store/receiptData.json'

const Row = ({labelName, purchasingDate} = {}) => (
  <TableRow>
    <TableCell>{labelName.english}</TableCell>
    <TableCell>{purchasingDate}</TableCell>
  </TableRow>
)

function getProductsPurchasingDates(products) {
  for(let rd of receiptData) {
    for(let p of products){
      if(p.ean === rd.EAN) {
        p["purchasingDate"] = rd.TransactionDate
      }
    }
  }
  return products
}

function custom_sort(a, b) {
  return new Date(b.purchasingDate).getTime() - new Date(a.purchasingDate).getTime();
}

export default function PurchaseHistory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsFromReceipts())
  }, [dispatch])
  const products = useSelector(state => state.purchaseHistory.products)
  const productsWithDates = getProductsPurchasingDates(products)
  const sortedData = productsWithDates.sort(custom_sort);
  return (
    <>
      <h1>Purchase History</h1>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Purchase Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item, i) => <Row key={i} {...item} />)}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
