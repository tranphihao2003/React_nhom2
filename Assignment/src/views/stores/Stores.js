import React from 'react'
import { CTable, CPagination, CPaginationItem } from '@coreui/react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Stores = () => {
  const columns = [
    {
      key: 'store_id',
      label: 'Mã cửa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'store_name',
      label: 'Tên cửa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'store_location',
      label: 'Địa chỉ',
      _props: { scope: 'col' },
    },
    {
      key: 'store_phone',
      label: 'Số điện thoại',
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

  const items = [
    {
      store_id: 1,
      store_name: 'Music World',
      store_location: '123 Đường Âm nhạc, Hà Nội',
      store_phone: '(024) 1234 5678',
      status: <span className="badge bg-success">Còn hàng</span>,
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
      _cellProps: { store_id: { scope: 'row' } },
    },
    {
      store_id: 2,
      store_name: 'Sound Palace',
      store_location: '456 Đại lộ Âm thanh, TP. Hồ Chí Minh',
      store_phone: '(028) 8765 4321',
      status: <span className="badge bg-success">Còn hàng</span>,
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
      _cellProps: { store_id: { scope: 'row' } },
    },
  ]

  return (
    <div>
      <CTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} {...column._props}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.store_id}>
              <td>{item.store_id}</td>
              <td>{item.store_name}</td>
              <td>{item.store_location}</td>
              <td>{item.store_phone}</td>
              <td>{item.status}</td>
              <td>{item.actions}</td>
            </tr>
          ))}
        </tbody>
      </CTable>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem>Trước</CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>Tiếp</CPaginationItem>
      </CPagination>
    </div>
  )
}

export default Stores
