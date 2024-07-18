import React from 'react'
import { CTable, CPagination, CPaginationItem } from '@coreui/react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Link } from 'react-router-dom'
const Cutstomers = () => {
  const columns = [
    {
      key: 'id',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'first_Name',
      label: 'Tên',
      _props: { scope: 'col' },
    },

    {
      key: 'last_Name',
      label: 'Họ',
      _props: { scope: 'col' },
    },
    {
      key: 'Email',
      label: 'Email',
      _props: { scope: 'col' },
    },
    {
      key: 'Phone',
      label: 'Số Điện Thoại',
      _props: { scope: 'col' },
    },
    {
      key: 'Address',
      label: 'Địa Chỉ',
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
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      Email: 'jack5mGmail.com',
      Phone: '012312312',
      Address: 'Bến tre',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditCustomers">
            <CButton variant="outline" color="success">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      Email: 'jack5mGmail.com',
      Phone: '012312312',
      Address: 'Bến tre',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditCustomers">
            <CButton variant="outline" color="success">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      Email: 'jack5mGmail.com',
      Phone: '012312312',
      Address: 'Bến tre',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditCustomers">
            <CButton variant="outline" color="success">
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

export default Cutstomers
