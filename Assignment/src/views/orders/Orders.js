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
import * as API_Order from '../../services/API/API_Orders'
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

  const [reloadheader, setreloadheader] = useState(false)
  const [items, setItems] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Đơn hàng'
    getdata(pagination.page, pagination.pageSize)
  }, [])

  function getdata(page, pageSize) {
    API_Order.getOrders(page, pageSize).then((response) => {
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
    API_Order.deleteOrder(id).then((response) => {
      ShowSwal('success', 'Xóa thành công')
      getdata()
    })
  }

  function editacp(id) {
    navigate(`/orders/order_update/${id}`)
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
    navigate(`/orders?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
    console.log('====================================')
    console.log(pagination)
    console.log('====================================')
  }

  // Status hiển thị theo số
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return <CButton className="btn btn-danger" style={{ width: '150px', color: 'white' }}>Chờ xác nhận</CButton>
      case 1:
        return <CButton className="btn btn-warning" style={{ width: '150px', color: 'white' }}>Đang Giao</CButton>
      case 2:
        return <CButton className="btn btn-success" style={{ width: '150px', color: 'white' }}>Hoàn thành</CButton>
      case 3:
        return <CButton className="btn btn-secondary" style={{ width: '150px', color: 'white' }}>Đã hủy</CButton>
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
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Lấy ngày, tháng, năm
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, thêm 1 và định dạng với 2 chữ số
    const day = ('0' + date.getDate()).slice(-2); // Định dạng với 2 chữ số

    return `${year}-${month}-${day}`;
  }
  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.Status = getStatusText(item.Status)
        item.Total_Amount = formatCurrency(item.Total_Amount)
        item.Order_Date = formatDate(item.Order_Date)

        item.actions = (
          <>
            <Link to={`/orders/order_detail/${item.Order_ID}`}>
              <CButton variant="outline" color="primary">
                Chi tiết
              </CButton>
            </Link>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="Bạn muốn chỉnh sửa?"
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
            
            <CButton
              onClick={() => navigate('/orders/order_add')}
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
