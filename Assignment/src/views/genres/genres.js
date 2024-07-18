import React from 'react'
import { CTable, CPagination, CPaginationItem } from '@coreui/react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Link } from 'react-router-dom'
const Genres = () => {
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
