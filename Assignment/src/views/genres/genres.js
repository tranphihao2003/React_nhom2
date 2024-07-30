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
import API_Genres from '../../services/API/API_Genres'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1, //lấy ra từ url
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  })
  const API_Class = new API_Genres()
  const [reloadheader, setreloadheader] = useState(false)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Loại'
    getdata(pagination.page, pagination.pageSize)
  }, [])

  function getdata(page, pageSize) {
    // lấy data api
    API_Class.getGenres(page, pageSize).then((response) => {
      setPagination({
        totalItems: response.totalItems,
        totalPages: response.totalPages,
        page: response.currentPage,
        pageSize: response.pageSize,
      })
      renderdata(response.genres)
    })
  }

  function deleteacp(id) {
    API_Class.changestatus(id, 1).then((response) => {
      ShowSwal('success', 'Xóa loại thành công')
      getdata(pagination.page, pagination.pageSize)
      setreloadheader((reloadheader) => !reloadheader)
    })
  }
  function editacp(id) {
    navigate(`/genres/${id}`)
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
    navigate(`/genres?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
  }

  const columns = [
    {
      key: 'STT',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Genre_Name',
      label: 'Tên Thể loại',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Thao Tác',
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
              content="Bạn muốn xóa ?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
              id={item.Genre_ID}
              nameitems={item.Genre_Name}
            ></ModalComponent>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="Bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={item.Genre_ID}
              nameitems={item.Genre_Name}
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
              Danh sách loại
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Genre_ID"
              API={API_Genres}
              path="genres"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/AddGenres')}
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

export default Genres
