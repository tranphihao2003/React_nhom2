import React from 'react'
import { CTable } from '@coreui/react'

const Products = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Giá sản phẩm</th>
          <th scope="col">Ảnh sản phẩm</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Đĩa Jack 1</td>
          <td>5.000.000vnđ</td>
          <td>anhjack</td>
          <td>
            <button className="btn btn-primary">Sửa</button>
          </td>
          <td>
            <button className="btn btn-danger">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Products
