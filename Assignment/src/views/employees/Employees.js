import React from 'react'
import { CTable, CPagination, CPaginationItem } from '@coreui/react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Link } from 'react-router-dom'
const Employees = () => {
  const columns = [
    {
      key: 'id',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'last_Name',
      label: 'Họ',
      _props: { scope: 'col' },
    },

    {
      key: 'first_Name',
      label: 'Tên',
      _props: { scope: 'col' },
    },
    {
      key: 'salary',
      label: 'Lương (VNĐ)',
      _props: { scope: 'col' },
    },
    {
      key: 'store_ID',
      label: 'Cửa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'position',
      label: 'Chức vụ',
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

  const items = [
    {
      id: 1,
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      salary: '5,000',
      store_ID: 'Đống đa hà nội',
      position: 'Nhân viên',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditEmployees">
            <CButton variant="outline" color="primary">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      status: <span className="badge bg-danger">Đã chết </span>,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      salary: '5,000',
      store_ID: 'Đống đa hà nội',
      position: 'Nhân viên',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditEmployees">
            <CButton variant="outline" color="primary">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      status: <span className="badge bg-danger">Đã chết </span>,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      salary: '5,000',
      store_ID: 'Đống đa hà nội',
      position: 'Nhân viên',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditEmployees">
            <CButton variant="outline" color="primary">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      status: <span className="badge bg-success">Còn Sống </span>,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      first_Name: 'Jack',
      last_Name: 'Thái Văn',
      salary: '5,000',
      store_ID: 'Đống đa hà nội',
      position: 'Nhân viên',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <Link to="/EditEmployees">
            <CButton variant="outline" color="primary">
              <CIcon icon={icon.cilColorBorder} />
            </CButton>{' '}
          </Link>
        </>
      ),
      status: <span className="badge bg-success">Còn Sống </span>,
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

export default Employees
