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
import * as API_Genres from '../../services/API/API_Genre'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Link } from 'react-router-dom'
const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1, //lấy ra từ url
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  })

  const [reloadheader, setreloadheader] = useState(false)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Loại'
    getdata(pagination.page, pagination.pageSize)
  }, [])

  function getdata(page, pageSize) {
    // lấy data api
    API_Genres.getGenres(page, pageSize).then((response) => {
      const { data } = response
      console.log(data)
      setPagination({
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      renderdata(data.genres)
    })
  }

  function deleteacp(id) {
    API_Genres.changestatus(id, 1).then((response) => {
      ShowSwal('success', 'Xóa loại thành công')
      getdata(pagination.page, pagination.pageSize)
      setreloadheader((reloadheader) => !reloadheader)
    })
  }
  function editacp(id) {
    navigate(`/EditGenres/${id}`)
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
      key: 'id',
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

  const items = [
    {
      id: 1,
      Genre_Name: 'Rapppp',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditGenres">
            <CButton variant="outline" color="primary">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      Genre_Name: 'Roccc',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditGenres">
            <CButton variant="outline" color="primary">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      _cellProps: { id: { scope: 'row' } },
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

export default Genres
