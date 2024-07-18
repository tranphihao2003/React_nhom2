import React from 'react'
import { CTable, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Order_Detail = (props) => {
  const columns = [
    {
      key: 'Order_Detail_ID',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_ID',
      label: 'Sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'Quantity',
      label: 'Số lượng',
      _props: { scope: 'col' },
    },
    {
      key: 'Price',
      label: 'Giá sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]

  const items = [
    {
      Order_Detail_ID: 1,
      Product_ID: 'Đánh Đổi',
      Quantity: '2',
      Price: '780,000',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
        </>
      ),
      _cellProps: { Order_ID: { scope: 'row' } },
    },
  ]
  return <CTable striped hover columns={columns} items={items} />
}

export default Order_Detail
