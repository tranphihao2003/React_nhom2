import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CTable,
  CPagination,
  CPaginationItem,
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react'
import * as API_Customers from '../../services/API/API_Customers'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'

const Customer = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  })

  const [reloadheader, setreloadheader] = useState([])
  const [items, setItems] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'customers'
    getdata(pagination.page, pagination.pageSize)
  }, [])
  function getdata(page, pageSize) {
    // lấy data api

    API_Customers.getCustomers(page, pageSize).then((response) => {
      const { data } = response

      setPagination({
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      renderdata(data.customers)
    })
  }
  function deleteacp(id) {
    API_Customers.changestatus(id, 1).then((response) => {
      ShowSwal('success', 'Xóa thành công')
      getdata(pagination.page, pagination.pageSize)
      setreloadheader((reloadheader) => !reloadheader)
    })
  }
  function editacp(id) {
    navigate(`/EditCustomers/${id}`)
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
    navigate(`/customers?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
  }
  const columns = [
    {
      key: 'STT',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'First_Name',
      label: 'Tên ',
      _props: { scope: 'col' },
    },
    {
      key: 'Last_Name',
      label: 'Họ ',
      _props: { scope: 'col' },
    },
    {
      key: 'Email',
      label: 'Email',
      _props: { scope: 'col' },
    },
    {
      key: 'Phone',
      label: 'Số điện thoại',
      _props: { scope: 'col' },
    },
    {
      key: 'Address',
      label: 'Địa chỉ',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Hành động',
      _props: { scope: 'col' },
    },
  ]
  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.STT = index + 1
        item.status =
          item.Customer_Status == 0 ? (
            <CBadge color="danger">Ngừng Hoạt động</CBadge>
          ) : (
            <CBadge color="success"> hoạt động</CBadge>
          )
        item.actions = (
          <>
            <ModalComponent
              {...item}
              color="danger"
              content="bạn muốn xóa ?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
              id={item.Customer_ID}
              nameitems={item.First_Name}
            ></ModalComponent>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={item.Customer_ID}
              nameitems={item.First_Name}
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
              Danh sách khách hàng
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Customer_ID"
              API={API_Customers}
              path="Customers"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/AddCustomers')}
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

        {items.lenght === 0 && <div className="text-center">khong co du lieu</div>}
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

export default Customer
