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
} from '@coreui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import * as API from '../../services/API/API_Product'
import { debounce, set } from 'lodash'

const SearchBox = (props) => {
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])

  async function searchkey(key) {
    try {
      const search = await API.searchProduct(key)
      const { data } = search
      renderdata(data)
    } catch (error) {
      console.error('Search failed', error)
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
                restoreitem(item[props.id])
              }}
              className="me-2"
            >
              <CIcon icon={icon.cilReload} />
            </CButton>
            <CButton
              color="danger"
              onClick={() => {
                deleteItem(item[props.id])
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
      <CCol col="2" sm="2" md="2" className="mb-3 mb-xl-0">
        <CFormInput
          type="search"
          id="search"
          name="search"
          placeholder="Tìm kiếm"
          onClick={() => setVisible(!visible)}
        />
      </CCol>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        size="lg"
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
              <CTable striped hover columns={columns} items={items} />
            </div>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default SearchBox
