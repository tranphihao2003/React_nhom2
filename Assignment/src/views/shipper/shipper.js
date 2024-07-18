import React from 'react'
import { CTable, CPagination, CPaginationItem } from '@coreui/react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
const Shipper = () => {
  const columns = [
    {
      key: 'id',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'Tên người giao',
      _props: { scope: 'col' },
    },
    {
      key: 'age',
      label: 'Tuổi',
      _props: { scope: 'col' },
    },
    {
      key: 'SĐT',
      label: 'SỐ ĐT',
      _props: { scope: 'col' },
    },
    {
      key: 'Store_ID',
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

  const items = [
    {
      id: 1,
      name: 'Nguyen Van A',
      age: 30,
      SĐT: '0901234567',
      Store_ID: 'Store 1',
      status: <span class="badge text-bg-success">Đang giao hàng</span>,
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <CButton color="primary">
            <CIcon icon={icon.cilPencil} />
          </CButton>
        </>
      ),
    },
    {
      id: 2,
      name: 'Tran Thi B',
      age: 25,
      SĐT: '0912345678',
      Store_ID: 'Store 2',
      status: <span class="badge text-bg-warning">Đang sẵn sàng</span>,

      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <CButton color="primary">
            <CIcon icon={icon.cilPencil} />
          </CButton>
        </>
      ),
    },
    {
      id: 3,
      name: 'Le Van C',
      age: 28,
      SĐT: '0923456789',
      Store_ID: 'Store 3',
      status: <span className="badge text-bg-danger">chưa hoạt động</span>,

      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
          <CButton color="primary">
            <CIcon icon={icon.cilPencil} />
          </CButton>
        </>
      ),
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

export default Shipper
