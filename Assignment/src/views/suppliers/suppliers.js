import React from 'react'
import { CButton, CTable, CPagination, CPaginationItem } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
const Suppliers = () => {
  const columns = [
    {
      key: 'Supplier_ID',
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

  const items = [
    {
      Supplier_ID: 'SUP001',
      Supplier_Name: 'Công ty TNHH A',
      Contact_Name: 'Nguyễn Văn A',
      Contact_Email: 'nguyenvana@gmail.com',
      Contact_Phone: '0901234567',
      Address: 'Số 10, Đường ABC, Quận XYZ, Thành phố HCM',
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
      Supplier_ID: 'SUP002',
      Supplier_Name: 'Công ty TNHH B',
      Contact_Name: 'Trần Thị B',
      Contact_Email: 'tranthib@gmail.com',
      Contact_Phone: '0912345678',
      Address: 'Số 20, Đường XYZ, Quận ABC, Thành phố HCM',
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
      Supplier_ID: 'SUP003',
      Supplier_Name: 'Công ty TNHH C',
      Contact_Name: 'Lê Văn C',
      Contact_Email: 'levanc@gmail.com',
      Contact_Phone: '0923456789',
      Address: 'Số 30, Đường PQR, Quận DEF, Thành phố HCM',
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

export default Suppliers
