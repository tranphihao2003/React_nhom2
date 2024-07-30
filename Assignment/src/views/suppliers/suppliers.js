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
} from '@coreui/react'
import * as API from '../../services/API/API_suppliers'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'

const Suppliers = () => {
  // Phân trang
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1, //  lấy ra page từ url
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10, // lấy ra pageSize từ url
    totalItems: 0,
    totalPages: 0,
  })
  const [reloadheader, setreloadheader] = useState(false) // reload thùng rác khi xóa

  const [items, setItems] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Nhà phân phối'
    getdata(pagination.page, pagination.pageSize)
  }, [])
  function getdata(page, pageSize) {
    // lấy data api
    API.getsuppliers(page, pageSize).then((response) => {
      const { data } = response
      setPagination({
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      renderdata(data.suppliers)
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
    navigate(`/suppliers/${id}`)
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
    // thay đổi page
    searchParams.set('page', newpage)
    navigate(`/suppliers?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
  }
  const columns = [
    {
      key: 'STT',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Supplier_Name',
      label: 'Tên nhà cung cấp',
      _props: { scope: 'col' },
    },
    {
      key: 'Contact_Name',
      label: 'Tên người liên hệ',
      _props: { scope: 'col' },
    },
    {
      key: 'Contact_Email',
      label: 'Email người liên hệ',
      _props: { scope: 'col' },
    },
    {
      key: 'Contact_Phone',
      label: 'SĐT người liên hệ',
      _props: { scope: 'col' },
    },
    {
      key: 'Address',
      label: 'Địa chỉ',
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
        item.STT = index + 1
        item.actions = (
          <>
            <ModalComponent
              {...item}
              color="danger"
              content="bạn muốn xóa ?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
              id={item.Supplier_ID}
              variant="outline"
              nameitems={item.Supplier_Name}
            ></ModalComponent>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={item.Supplier_ID}
              nameitems={item.Supplier_Name}
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
              Danh sách nhà cung cấp
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Supplier_ID"
              API={API}
              path="suppliers"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/suppliers/add')}
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
      {items.length != 0 && (
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
      )}
    </CCard>
  )
}

export default Suppliers
