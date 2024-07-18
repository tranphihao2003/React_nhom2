import React from 'react'
import { CTable, CPagination, CPaginationItem, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Accounts = () => {
  const columns = [
    {
      key: 'account_id',
      label: 'Mã tài khoản',
      _props: { scope: 'col' },
    },
    {
      key: 'username',
      label: 'Tên người dùng',
      _props: { scope: 'col' },
    },
    {
      key: 'password',
      label: 'Mật khẩu',
      _props: { scope: 'col' },
    },
    {
      key: 'employee_id',
      label: 'Mã nhân viên',
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
      account_id: 1,
      username: 'johndoe',
      password: 'password123',
      employee_id: 101,
      status: <span className="badge bg-success">Hoạt động</span>,
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
      account_id: 2,
      username: 'janedoe',
      password: 'password456',
      employee_id: 102,
      status: <span className="badge bg-danger">Không hoạt động</span>,
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
            <tr key={item.account_id}>
              <td>{item.account_id}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>{item.employee_id}</td>
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

export default Accounts
