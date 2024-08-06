import React, { useState, useEffect } from 'react'
import {
  CTable,
  CPagination,
  CPaginationItem,
  CBadge,
  CCard,
  CCardHeader,
  CRow,
  CCol,
} from '@coreui/react'

import * as API from '../../services/API/API_Shipper'

import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'

const Shipper = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  })
  const [reloadheader, setreloadheader] = useState(false)
  const [items, setItems] = useState([])
  useEffect(() => {
    document.title = 'Người giao hàng'
    getdata(pagination.page, pagination.pageSize)
  }, [])
  const getdata = (page, pageSize) => {
    API.getShippers(page, pageSize).then((res) => {
      const { data } = res

      setPagination({
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      renderdata(data.shippers)
    })
  }
  const deleteacp = (id) => {
    API.changestatus(id, 1).then((res) => {
      ShowSwal('success', 'Xóa thành công')
      getdata(pagination.page, pagination.pageSize)
      setreloadheader((reloadheader) => !reloadheader)
    })
  }

  const editacp = (id) => {
    navigate(`/Shippers/${id}`)
  }
  function handlePageChange(newpage) {
    searchParams.set('page', newpage)
    navigate(`/Shipper?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
  }
  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.STT = index + 1

        switch (item.status) {
          case 0:
            item.status = <CBadge color="success">Đang hoạt động</CBadge>
            break
          case 1:
            item.status = <CBadge color="danger">Ngừng hoạt động</CBadge>
            break
          case 2:
            item.status = <CBadge color="warning">Đang chờ duyệt</CBadge>
          default:
            break
        }
        item.actions = (
          <>
            <ModalComponent
              id={item.Shipper_ID}
              nameitems={item.Shipper_Name}
              color="danger"
              content="bạn muốn xóa ? 
                sau khi xóa vào thùng rác bạn có thể khôi phục lại"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
            ></ModalComponent>{' '}
            <ModalComponent
              id={item.Shipper_ID}
              nameitems={item.Shipper_Name}
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
  const columns = [
    {
      key: 'STT',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Shipper_Name',
      label: 'Tên người giao',
      _props: { scope: 'col' },
    },
    {
      key: 'Age',
      label: 'Tuổi',
      _props: { scope: 'col' },
    },
    {
      key: 'Phone',
      label: 'SỐ ĐT',
      _props: { scope: 'col' },
    },
    {
      key: 'Store_Name',
      label: 'Cừa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      label: 'Trạng thái',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]
  const ShowSwal = (status, title) => {
    withReactContent(Swal).fire({
      position: 'center',
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1000,
    })
  }
  return (
    <CCard>
      {' '}
      <CCardHeader>
        <CRow className="align-items-center">
          <CCol sm="3">
            <h5 id="traffic" className="card-title mb-0">
              Danh sách sản phẩm
            </h5>
          </CCol>

          <CCol sm="9" className="d-flex justify-content-end">
            <AppHeaderHistory
              id="Shipper_ID"
              API={API}
              path="Shippers"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/Shippers/add')}
              color="primary"
              className="float-end me-2 px-4 text-white"
            >
              <CIcon icon={icon.cilPlus} /> Thêm mới
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <div>
        <CTable striped hover columns={columns} items={items} />
        {items.length === 0 && <div className="text-center p-3">Không có dữ liệu để hiển thị</div>}
      </div>
      {items.length !== 0 && (
        <CPagination align="center" aria-label="Page navigation example">
          <CPaginationItem
            disabled={pagination.page <= 1}
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

export default Shipper
