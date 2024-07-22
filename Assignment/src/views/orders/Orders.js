import React, { useEffect, useState } from 'react'
import { CTable, CButton, CPagination, CPaginationItem } from '@coreui/react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import ModalComponent from '../../components/modal/modalComponent'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import API_Order from '../../services/API/API_Order'

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
    navigate(`/orders/${id}`)
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
    // {
    //   key: 'Payment_Status',
    //   label: 'Trạng thái',
    //   _props: { scope: 'col' },
    // },
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]

  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.actions = (
          <>
            <ModalComponent
              {...item}
              color="danger"
              content="bạn muốn xóa ?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
            ></ModalComponent>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
            ></ModalComponent>
          </>
        )
        return item
      }),
    )
  }

  return (
    <>
      <CTable striped hover columns={columns} items={items} />
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem
          disabled={pagination.page === 1}
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
          <CPaginationItem
            key={page}
            active={page === pagination.page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </CPaginationItem>
        ))}
        <CPaginationItem>
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default Orders
