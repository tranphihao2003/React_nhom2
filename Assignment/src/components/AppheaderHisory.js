import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CBadge,
  CSpinner,
} from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import API_config from '../config/API_config'
import { useNavigate } from 'react-router-dom'

const COLUMNS_CONFIG = {
  products: [
    { key: 'STT', label: 'STT' },
    { key: 'Product_Name', label: 'Tên sản phẩm' },
    { key: 'Product_Image', label: 'Hình ảnh' },
    { key: 'Product_Price', label: 'Giá' },
    { key: 'Product_Stock', label: 'Số lượng' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'actions', label: 'Thao tác' },
  ],
  suppliers: [
    { key: 'STT', label: 'STT' },
    { key: 'Supplier_Name', label: 'Tên nhà cung cấp' },
    { key: 'Contact_Name', label: 'Tên người liên hệ' },
    { key: 'Contact_Email', label: 'Email người liên hệ' },
    { key: 'Contact_Phone', label: 'SĐT người liên hệ' },
    { key: 'actions', label: 'Thao tác' },
  ],
  Shippers: [
    { key: 'STT', label: 'STT' },
    { key: 'Shipper_Name', label: 'Tên người giao hàng' },
    { key: 'Age', label: 'Tuổi' },
    { key: 'Phone', label: 'SỐ điện thoại' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'actions', label: 'Thao tác' },
  ],
  employees: [
    { key: 'STT', label: 'STT' },
    { key: 'First_Name', label: 'Họ' },
    { key: 'Last_Name', label: 'Tên' },
    { key: 'Store_ID', label: 'Chi nhánh' },
    { key: 'Position', label: 'Vị trí' },
    { key: 'Salary', label: 'Lương' },
    { key: 'Status', label: 'Trạng thái' },
    { key: 'actions', label: 'Thao tác' },
  ],
}

const AppHeaderHistory = (props) => {
  const API_Class = props.API
  const navigate = useNavigate()
  const [visibleLg, setVisibleLg] = useState(false)
  const [items, setItems] = useState([])
  const [countTag, setCountTag] = useState(0)
  const config_path = Object.keys(API_config)
  useEffect(() => {
    getdata()
  }, [visibleLg, props.status])
  async function getdata() {
    const api = new API_Class()
    for (const item of config_path) {
      if (item === props.path) {
        const data = await api.backdata()
        setCountTag(data.length)
        renderdata(data)
        break
      }
    }
  }

  async function deleteProduct(id) {
    const api = new API_Class()
    const data = await api.delete(id)
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Xóa sản phẩm thành công',
        showConfirmButton: false,
        timer: 1500,
      })
      getdata()
      props.loaddata(props.page, 10)
    }
  }
  async function restoreProduct(id) {
    console.log(id)
    const api = new API_Class()
    const data = await api.changeStatus(id, 0)
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Khôi phục sản phẩm thành công',
        showConfirmButton: false,
        timer: 1500,
      })
      getdata()
      props.loaddata(props.page, 10)
    }
  }
  const renderdata = (data) => {
    setItems(
      data.map((item, index) => {
        item.STT = index + 1
        item.Product_Image = (
          <img src={item.Product_Image} alt={item.Product_Name} style={{ width: '50px' }} />
        )
        item.Status =
          item.Status === 1 ? (
            <CBadge color="danger">Tạm ngưng</CBadge>
          ) : (
            <CBadge color="secondary">Inactive</CBadge>
          )
        item.actions = (
          <>
            <CButton
              color="primary"
              onClick={() => {
                restoreProduct(item[props.id])
              }}
              className="me-2"
            >
              <CIcon icon={icon.cilReload} />
            </CButton>
            <CButton
              color="danger"
              onClick={() => {
                deleteProduct(item[props.id])
              }}
            >
              <CIcon icon={icon.cilTrash} />
            </CButton>
          </>
        )
        return item
      }),
    )
  }
  const columns = () => {
    return COLUMNS_CONFIG[props.path]
  }

  return (
    <>
      <CButton
        color="primary"
        className="float-end px-4"
        onClick={() => {
          setVisibleLg(!visibleLg)
        }}
      >
        <CIcon icon={icon.cilTrash} />
        <span className="badge bg-danger ms-2">{countTag}</span>
      </CButton>

      <CModal
        size="xl"
        visible={visibleLg}
        onClose={() => setVisibleLg(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">Các sản phẩm đã xóa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped hover columns={columns()} items={items} />
          {items.length === 0 && (
            <div className="d-flex justify-content-center">Không có dữ liệu</div>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}
export default AppHeaderHistory
