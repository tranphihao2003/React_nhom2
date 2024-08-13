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
import * as API_Order_Detail from '../../services/API/API_Order_Detail'

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

  const [items, setItems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Chi tiết đơn hàng'
    get_data()
  }, [])

  function get_data() {
    API_Order_Detail.getOrder_Detail(id).then((response) => {
      render_data(response)
    })
  }

  // Format giá
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }

const Order_Detail = (props) => {
  const columns = [
    {
      key: 'Order_Detail_ID',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_ID',
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
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]

  const items = [
    {
      Order_Detail_ID: 1,
      Product_ID: 'Đánh Đổi',
      Quantity: '2',
      Price: '780,000',
      actions: (
        <>
          <CButton variant="outline" color="danger">
            <CIcon icon={icon.cilTrash} />
          </CButton>{' '}
        </>
      ),
      _cellProps: { Order_ID: { scope: 'row' } },
    },
  ]
  return <CTable striped hover columns={columns} items={items} />
}

export default Order_Detail
