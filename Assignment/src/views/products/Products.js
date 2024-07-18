import React from 'react'
import { CTable, CPagination, CPaginationItem } from '@coreui/react'
import { CButton } from '@coreui/react'

const Products = () => {
  const columns = [
    {
      key: 'id',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'Tên sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'image',
      label: 'Hình ảnh',
      _props: { scope: 'col' },
    },
    {
      key: 'artist',
      label: 'Nghệ sĩ',
      _props: { scope: 'col' },
    },
    {
      key: 'price',
      label: 'Giá (VNĐ)',
      _props: { scope: 'col' },
    },
    {
      key: 'quantity',
      label: 'Số lượng',
      _props: { scope: 'col' },
    },
    {
      key: 'trangthai',
      label: 'Số lượng',
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
      name: 'Đánh đổi',
      image: (
        <img
          src="data:image/jpeg;base64,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"
          alt="Album ABC"
          width={50}
        />
      ),
      artist: 'Obito',
      price: '390,000',
      quantity: 10,
      actions: (
        <>
          <CButton color="primary">Chỉnh sửa</CButton> <CButton color="danger">Xóa</CButton>
        </>
      ),
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      name: 'ACPBDTDD',
      image: (
        <img
          src="data:image/jpeg;base64,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"
          alt="Album DEF"
          width={50}
        />
      ),
      artist: 'Hiếu Thứ 2',
      price: '500,000',
      quantity: 5,
      actions: (
        <>
          <CButton color="primary">Chỉnh sửa</CButton> <CButton color="danger">Xóa</CButton>
        </>
      ),
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      name: '99% MCK',
      image: (
        <img
          src="https://bizweb.dktcdn.net/100/411/628/products/booklet-2-1-1-86f8961a-2c66-4dbe-b979-f0466a7c3083.jpg?v=1677758994023"
          alt="Album XYZ"
          width={50}
        />
      ),
      artist: 'MCK',
      price: '560,000',
      quantity: 8,
      actions: (
        <>
          <CButton color="primary">Chỉnh sửa</CButton> <CButton color="danger">Xóa</CButton>
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

export default Products
