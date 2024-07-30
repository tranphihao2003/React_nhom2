import React from 'react'
import {
  CButton,
  CTable,
  CPagination,
  CPaginationItem,
  CCard,
  CCardHeader,
  CRow,
  CCol,
} from '@coreui/react'
import API_Order_Detail from '../../services/API/API_Order_Detail'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'
import { useState, useEffect } from 'react'

const Order_Detail = () => {
  let { id } = useParams()

  const API_Class = new API_Order_Detail()
  const [items, setItems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Chi tiết đơn hàng'
    get_data()
  }, [])

  function get_data() {
    API_Class.getOrder_Detail(id).then((response) => {
      render_data(response)
    })
  }

  // Format giá
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }

  const columns = [
    {
      key: 'Order_Detail_ID',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Name',
      label: 'Sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'Quantity',
      label: 'Số lượng',
      _props: { scope: 'col' },
    },
    {
      key: 'Price',
      label: 'Giá sản phẩm',
      _props: { scope: 'col' },
    },
  ]

  function render_data(items) {
    setItems(
      items.map((item, index) => {
        item.Price = formatCurrency(item.Price)
        return item
      }),
    )
  }

  return (
    <CCard>
      <div style={{ minHeight: '70vh' }}>
        <CTable striped hover columns={columns} items={items} />
        {items.length === 0 && <div className="text-center">Không có dữ liệu</div>}
      </div>
    </CCard>
  )
}

export default Order_Detail
