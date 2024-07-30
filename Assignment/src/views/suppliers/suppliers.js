import React, { useEffect, useState } from 'react'
import { CButton, CTable, CPagination, CPaginationItem } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import API_Genres from '../../services/API/API_Genres'
const Genres = () => {
  useEffect(() => {
    document.title = 'Nhà phân phối'
    const API_Class = new API_Genres()
    API_Class.getGenres().then((response) => {
      renderdata(response.suppliers)
    })
  }, [])
  const columns = [
    {
      key: 'Genre_ID',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Genre_Name',
      label: 'Tên nhà cung cấp',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]
  const [items, setItems] = useState([])

  function renderdata(items) {
    return items.map((item, index) => {
      item.Genre_ID = index + 1
      item.actions = (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <CButton color="primary">
            <CIcon icon={icon.cilPencil} />
          </CButton>
        </>
      )
      setItems((items) => [...items, item])
    })
  }
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
