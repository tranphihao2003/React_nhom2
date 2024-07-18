import React from 'react'
import { CTable, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
const Orders = (props) => {
  const columns = [
    {
      key: 'Order_ID',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Store_ID',
      label: 'Chi nhánh',
      _props: { scope: 'col' },
    },
    {
      key: 'Employee_ID',
      label: 'Nhân viên',
      _props: { scope: 'col' },
    },
    {
      key: 'Customer_ID',
      label: 'Khách hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'Order_Date',
      label: 'Thời gian',
      _props: { scope: 'col' },
    },
    {
      key: 'Total_Amount',
      label: 'Giá (VNĐ)',
      _props: { scope: 'col' },
    },
    {
      key: 'Payment_Status',
      label: 'Trạng thái',
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
      Order_ID: 1,
      Store_ID: 'Chi nhánh 1',
      Employee_ID: 'Thái Dương',
      Customer_ID: 'Phương Tuấn',
      Order_Date: '25/9/2024',
      Total_Amount: '390,000',
      Payment_Status: <span className="badge bg-danger">Chưa xác nhận</span>,
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <CButton color="primary">
            <CIcon icon={icon.cilPencil} />
          </CButton>
        </>
      ),
      _cellProps: { Order_ID: { scope: 'row' } },
    },
    {
      Order_ID: 2,
      Store_ID: 'Chi nhánh 1',
      Employee_ID: 'Kỳ Nam',
      Customer_ID: 'Phương Tuấn',
      Order_Date: '7/16/2024',
      Total_Amount: '700,000',
      Payment_Status: <span className="badge bg-success">Đang giao</span>,
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <CButton color="primary">
            <CIcon icon={icon.cilPencil} />
          </CButton>
        </>
      ),
      _cellProps: { Order_ID: { scope: 'row' } },
    },
  ]
  return <CTable striped hover columns={columns} items={items} />
}

export default Orders
