import {
  CButton,
  CTable,
  CPagination,
  CPaginationItem,
  CCard,
  CCardHeader,
  CRow,
  CCol,
} from '@coreui/react'
import API_Order from '../../services/API/API_Order'

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
      key: 'Store_Name',
      label: 'Chi nhánh',
      _props: { scope: 'col' },
    },
    {
      key: 'Employee_FullName',
      label: 'Nhân viên',
      _props: { scope: 'col' },
    },
    {
      key: 'Customer_FullName',
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
      key: 'Status',
      label: 'Trạng thái',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]

  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.Status = getStatusText(item.Status)
        item.Total_Amount = formatCurrency(item.Total_Amount)
        item.actions = (
          <>
            <Link to={`/order_detail/${item.Order_ID}`}>
              <CButton variant="outline" color="primary">
                Chi tiết
              </CButton>
            </Link>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={item.Order_ID}
            ></ModalComponent>
          </>
        )
        return item
      }),
    )
  }

  return (
    <CCard>
      <CCardHeader>
        <CRow className="align-items-center">
          <CCol sm="3">
            <h5 id="traffic" className="card-title mb-0">
              Danh sách đơn hàng
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Order_ID"
              API={API_Order}
              path="suppliers"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/order_add')}
              color="success"
              className="float-end me-2 px-4 text-white"
            >
              <CIcon icon={icon.cilPlus} /> Thêm mới
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <div style={{ minHeight: '70vh' }}>
        <CTable striped hover columns={columns} items={items} />
        {items.length === 0 && <div className='text-center'>Không có dữ liệu</div>}
      </div>
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
        <CPaginationItem
          disabled={pagination.page === pagination.totalPages}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </CCard>
  )
}

export default Orders
