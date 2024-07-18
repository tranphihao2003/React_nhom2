import React from 'react'
import { CTable, CPagination, CPaginationItem, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Store_Products = () => {
  const columns = [
    {
      key: 'store_id',
      label: 'Mã cửa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'product_id',
      label: 'Mã sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'product_stock',
      label: 'Số lượng',
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
      product_id: 101,
      product_stock: 50,
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
    },
    {
      store_id: 2,
      product_id: 102,
      product_stock: 30,
      status: <span className="badge bg-warning">Sắp hết</span>,
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
              <td>{item.product_id}</td>
              <td>{item.product_stock}</td>
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

export default Store_Products
