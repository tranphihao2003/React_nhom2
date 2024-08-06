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

import * as API from '../../services/API/API_Employees'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'
import { useState, useEffect } from 'react'

const Employees = () => {
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
    document.title = 'Nhân viên'
    getdata(pagination.page, pagination.pageSize)
  }, [])

  function getdata(page, pageSize) {
    API.getEmployees(page, pageSize).then((response) => {
      const { data: Employees } = response
      setPagination({
        totalItems: Employees.totalItems,
        totalPages: Employees.totalPages,
        page: Employees.currentPage,
        pageSize: Employees.pageSize,
      })
      renderdata(Employees.employees)
    })
  }

  function deleteacp(id) {
    API.changestatus(id, 1).then((response) => {
      ShowSwal('success', 'Xóa thành công')
      getdata(pagination.page, pagination.pageSize)
      setreloadheader((reloadheader) => !reloadheader)
    })
  }

  function editacp(id) {
    navigate(`/EditEmployees/${id}`)
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
    navigate(`/employees?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)

  }

  // Status hiển thị theo số
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return <CButton className="btn btn-success">Đang hoạt động</CButton>
      case 1:
        return <CButton className="btn btn-danger">Ngưng hoạt động</CButton>
      default:
        return 'Không xác định'
    }
  }

  const getPositionText = (position) => {
    if (position == 1) {
      return 'Quản lý'
    } else {
      return 'Nhân Viên'
    }
  }

  // Format giá
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }
  const columns = [
    {
      key: 'Employee_ID',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Employee_FullName',
      label: 'Họ và tên',
      _props: { scope: 'col' },
    },

    {
      key: 'Salary',
      label: 'Lương (VNĐ)',
      _props: { scope: 'col' },
    },
    {
      key: 'Store_Name',
      label: 'Cửa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'Position',
      label: 'Chức vụ',
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
        item.Salary = formatCurrency(item.Salary)
        item.Position = getPositionText(item.Position)
        item.actions = (
          <>
            <ModalComponent
              {...item}
              color="danger"
              content="Bạn muốn xóa ?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
              id={item.Employee_ID}
              nameitems={item.First_Name}
            ></ModalComponent>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="Bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={item.Employee_ID}
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
              Danh sách nhân viên
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Employee_ID"
              API={API}
              path="employees"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/AddEmployees')}
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
        {items.length === 0 && <div className="text-center">Không có dữ liệu</div>}
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

export default Employees
