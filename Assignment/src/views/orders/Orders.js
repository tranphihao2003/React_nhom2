import React from 'react'
import { CTable, CButton, CPagination, CPaginationItem } from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'
import { useState, useEffect } from 'react'

const Orders = () => {
  // Phân trang
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 3,
    totalItems: 0,
    totalPages: 0,
  })

  const API_Class = new API_Order()
  const [reloadheader, setreloadheader] = useState(false)
  const [items, setItems] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Đơn hàng'
    getdata(pagination.page, pagination.pageSize)
  }, [])

  function getdata(page, pageSize) {
    API_Class.getOrders(page, pageSize).then((response) => {
      setPagination({
        totalItems: response.totalItems,
        totalPages: response.totalPages,
        page: response.currentPage,
        pageSize: response.pageSize,
      })
      renderdata(response.orders)
    })
  }

  function deleteacp(id) {
    API_Class.deleteOrder(id).then((response) => {
      ShowSwal('success', 'Xóa thành công')
      getdata()
    })
  }

  function editacp(id) {
    navigate(`/order_update/${id}`)
  }

  const ShowSwal = (status, title) => {
    withReactContent(Swal).fire({
      position: 'center',
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1000,
    })
  }

  function handlePageChange(newpage) {
    searchParams.set('page', newpage)
    navigate(`/suppliers?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
    console.log('====================================')
    console.log(pagination)
    console.log('====================================')
  }

  // Status hiển thị theo số
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return <CButton className="btn btn-danger">Chờ xác nhận</CButton>
      case 1:
        return <CButton className="btn btn-warning">Đang Giao</CButton>
      case 2:
        return <CButton className="btn btn-success">Hoàn thành</CButton>
      case 3:
        return <CButton className="btn btn-danger">Đã hủy</CButton>
      default:
        return 'Không xác định'
    }
  }

  // Format giá
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }

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
