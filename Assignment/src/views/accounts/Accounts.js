import React, { useEffect, useState } from 'react'
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
import * as API_Accounts from '../../services/API/API_Accounts'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'

const Accounts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  })
  const API_Class = new API_Accounts()
  const [reloadHeader, setReloadHeader] = useState(false)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Tài khoản'
    getData(pagination.page, pagination.pageSize)
  }, [pagination.page, pagination.pageSize, reloadHeader])

  const getData = (page, pageSize) => {
    API_Class.getAccounts(page, pageSize).then((response) => {
      setPagination({
        totalItems: response.totalItems,
        totalPages: response.totalPages,
        page: response.currentPage,
        pageSize: response.pageSize,
      })
      renderData(response.accounts)
    })
  }

  const deleteacp = (id) => {
    API_Class.changestatus(id, 1).then(() => {
      ShowSwal('success', 'Xóa thành công')
      getData(pagination.page, pagination.pageSize)
      setReloadHeader(prev => !prev)
    })
  }

  const editacp = (id) => {
    navigate(`/Accounts_edit/${id}`)
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

  const handlePageChange = (newPage) => {
    searchParams.set('page', newPage)
    navigate(`/accounts?${searchParams.toString()}`)
    getData(newPage, pagination.pageSize)
  }

  const columns = [
    {
      key: 'STT',
      label: 'Mã tài khoản',
      _props: { scope: 'col' },
    },
    {
      key: 'Username',
      label: 'Tên đăng nhập',
      _props: { scope: 'col' },
    },
    {
      key: 'Employee_ID',
      label: 'Mã nhân viên',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      label: 'Trạng thái',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Hành động',
      _props: { scope: 'col' },
    },
  ]

  const renderData = (accounts) => {
    setItems(
      accounts.map((account, index) => {
        account.STT = index + 1
        const statusClass = account.status === 0 ? 'text-bg-success' : 'text-bg-warning'
        const statusLabel = account.status === 0 ? 'Hoạt động' : 'Không hoạt động'

        account.status = (
          <span className={`badge ${statusClass}`}>{statusLabel}</span>
        )
        account.actions = (
          <>
            <ModalComponent
              {...account}
              color="danger"
              content="Bạn muốn xóa?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
              id={account.Account_ID}
              nameitems={account.Username}
            />
            <ModalComponent
              {...account}
              color="primary"
              content="Bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={account.Account_ID}
              nameitems={account.Username}
            />
          </>
        )
        return account
      }),
    )
  }

  return (
    <CCard>
      <CCardHeader>
        <CRow className="align-items-center">
          <CCol sm="3">
            <h5 id="traffic" className="card-title mb-0">
              Danh sách tài khoản
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Account_ID"
              API={API_Accounts}
              path="Accounts"
              page={pagination.page}
              loaddata={getData}
              status={reloadHeader}
            />
            <CButton
              onClick={() => navigate('/Accounts_add')}
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
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </CCard>
  )
}

export default Accounts
