import React from 'react'
import { CTable, CButton, CPagination, CPaginationItem } from '@coreui/react'
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
          <Link to={`/order_detail/1`}>
            <CButton variant="outline" color="danger">
              Chi tiết
            </CButton>
          </Link>{' '}
          <Link to={`/order_update/1`}>
            <CButton color="primary">
              <CIcon icon={icon.cilPencil} />
            </CButton>
          </Link>
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
          <Link to={`/order_detail/1`}>
            <CButton variant="outline" color="danger">
              Chi tiết
            </CButton>
          </Link>{' '}
          <Link to={`/order_update/1`}>
            <CButton color="primary">
              <CIcon icon={icon.cilPencil} />
            </CButton>
          </Link>
        </>
      ),
      _cellProps: { Order_ID: { scope: 'row' } },
    },
  ]
  return (
    <>
      <CTable striped hover columns={columns} items={items} />
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem disabled>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default Orders
