import React, { useState, useCallback } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CCol,
  CTable,
  CSpinner,
} from '@coreui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import * as API from '../../services/API/API_Product'
import { debounce } from 'lodash'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const SearchBox = (props) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false) // Trạng thái loading

  async function searchkey(key) {
    try {
      setLoading(true) // Bắt đầu hiển thị spinner
      const search = await API.searchProduct(key)
      const { data } = search
      renderdata(data)
    } catch (error) {
      console.error('Search failed', error)
    } finally {
      setLoading(false) // Dừng hiển thị spinner
    }
  }

  const Debouncesearch = useCallback(
    debounce((nextvalue) => searchkey(nextvalue), 1000),
    [],
  )

  const handleSearch = useCallback(
    (value) => {
      if (value !== '') {
        setSearch(value)
        Debouncesearch(value)
      } else {
        setItems([])
      }
    },
    [Debouncesearch],
  )

  useHotkeys('ctrl+i', () => setVisible(!visible))

  const configColumns = {
    products: [
      { key: 'STT', label: 'STT' },
      { key: 'Product_Name', label: 'Tên sản phẩm' },
      { key: 'Product_Price', label: 'Giá' },
      { key: 'Product_Stock', label: 'Số lượng' },
      { key: 'status', label: 'Trạng thái' },
      { key: 'actions', label: 'Thao tác' },
    ],
  }

  async function deleteItem(id) {
    const product = await API.changestatus(id, 1)
    const { data } = product
    if (data.errno === 1451) {
      Swal.fire({
        icon: 'error',
        title: 'Xóa thất bại',
        text: 'Sản phẩm này đang được sử dụng',
      }).then(() => {
        props.action()
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công',
      }).then(() => {
        props.action()
      })
    }
  }

  function renderdata(item) {
    setItems(
      item.map((item, index) => ({
        ...item,
        STT: index + 1,
        actions: (
          <>
            <CButton
              color="primary"
              onClick={() => {
                navigate(`/products/detail/${item.Product_ID}`)
              }}
              className="me-2"
            >
              Xem Chi tiết
            </CButton>
            <CButton
              color="danger"
              onClick={() => {
                deleteItem(item.Product_ID)
              }}
            >
              <CIcon icon={icon.cilTrash} />
            </CButton>
          </>
        ),
      })),
    )
  }

  const columns = configColumns[props.path]

  return (
    <>
      <CCol col="3" sm="3" md="3" className="mb-3 mb-xl-0">
        <CFormInput
          type="search"
          id="search"
          name="search"
          placeholder="Tìm kiếm (Ctrl + i)........."
          onClick={() => setVisible(!visible)}
        />
      </CCol>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        size="xl"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Tìm kiếm : {search}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol col="12" sm="12" md="12" className="mb-3 mb-xl-0">
            <CFormInput
              type="search"
              id="search"
              name="search"
              placeholder="Tìm kiếm Tên Tài liệu"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </CCol>
          <CCol col="12" sm="12" md="12" className="mb-3 mb-xl-0">
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {loading ? (
                <div className="text-center mt-3">
                  <CSpinner color="primary" />
                </div>
              ) : (
                <CTable striped hover columns={columns} items={items} />
              )}
              {items.length === 0 && !loading && (
                <div className="text-center mt-3">
                  <h5>Không có dữ liệu</h5>
                </div>
              )}
            </div>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default SearchBox
