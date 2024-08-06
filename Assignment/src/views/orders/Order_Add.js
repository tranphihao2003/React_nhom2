import { CTable, CButton, CFormSelect, CFormLabel, CForm, CFormInput, CRow, CCol } from '@coreui/react'

import API_Order from '../../services/API/API_Order'
import API_Product from '../../services/API/API_Product'
import API_Store from '../../services/API/API_Store'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'
import { useState, useEffect, React } from 'react'
import { useSelect } from 'react-select-search'
import { auto } from '@popperjs/core'

const Order_Add = () => {
  const Product_List = new API_Product()
  const Store_List = new API_Store()
  const [items, setItems] = useState([])
  const [stores, setStores] = useState([])
  const [customers, setCustomers] = useState([])

  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedStore, setSelectedStore] = useState('')
  const [selectedCustomers, setSelectedCustomers] = useState('')
  const [productOrderList, setProductOrderList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    get_data()
  }, [])

  async function get_data() {
    // Get thằng sản phẩm
    const product = await Product_List.getAllProductAdd()
    console.log(product)

    render_data(product)

    // Get thằng chi nhánh
    const store = await Store_List.getAllStoreAdd()
    render_data_store(store)

  }

  function render_data(items) {
    setItems(
      items.map((item, index) => {
        return item
      }),
    )
  }
  function render_data_store(items) {
    setStores(
      items.map((item, index) => {
        return item
      }),
    )
  }
  function render_data_customers(items) {
    setCustomers(
      items.map((item, index) => {
        return item
      }),
    )
  }

  function onSelectProduct(id) {
    Product_List.getProductById(id)
      .then((res) => {
        const newProduct = {
          Product_ID: res[0].Product_ID,
          Product_Name: res[0].Product_Name,
          Product_Price: res[0].Product_Price,
          Quantity: 1,
        }

        setProductOrderList([...productOrderList, newProduct])
        setTotalPrice(totalPrice + res[0].Product_Price)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  function truqty(id) {
    productOrderList.map((e)=>{
        if (e.Product_ID == id) {
            console.log(e);
            
        }
    })
    
    

  }
  function onChangeQta(index, newqty) {
    const updatedProductOrderList = [...productOrderList]
    updatedProductOrderList[index].quantity = Number(newqty)

    let totalPrice = 0
    updatedProductOrderList.forEach((element) => {
      totalPrice += element.price * element.quantity
    })

    setProductOrderList(updatedProductOrderList)
    setTotalPrice(
      totalPrice.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
      }),
    )

    console.log(updatedProductOrderList)
  }

  return (
    <>
      <h2>Thêm đơn hàng</h2>
      <CForm style={{ margin: '10px' }}>
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Khách hàng"
          options={['Chọn khách hàng', { label: 'Phi Hào', value: '1' }]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Sản phẩm"
          value={selectedProduct}
          onChange={(e) => onSelectProduct(e.target.value)}
        >
          <option value="">Chọn sản phẩm</option>
          {items.map((product) => (
            <option key={product.Product_ID} value={product.Product_ID}>
              {product.Product_Name}
            </option>
          ))}
        </CFormSelect>
        <ul style={{
          maxHeight: 300,
          overflow: auto
        }}>
          {productOrderList.map((item, index) => (
            <li key={index} className='m-2'>
              <CRow>
                <CCol xl={3}>
                  {item.Product_Name}
                </CCol>
                <CCol xl={4}>
                  <CRow>
                    <CCol xl={2}>
                      <CButton onClick={()=>truqty(item.Product_ID)}>
                        -
                      </CButton>
                    </CCol>
                    <CCol xl={8} >

                      <CFormInput className='text-center' defaultValue={1} type='number'></CFormInput>
                    </CCol>
                    <CCol xl={2}>

                      <CButton>
                        +
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xl={3} className='align-items-center d-flex justify-content-center' >
                  {item.Product_Price}
                </CCol>
                <CCol xl={2}>
                  <CButton>
                    Xóa
                  </CButton>
                </CCol>
              </CRow>
            </li>
          ))}
        </ul>
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="number"
          value={selectedProduct}
          id=""
          onChange={(e) => onChangeQta(e.target.value)}
          label="Số lượng"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="date"
          id=""
          label="Ngày đặt hàng"
          placeholder=""
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Nhân viên nhập đơn"
          options={[
            'Chọn nhân viên',
            { label: 'Thái Dương', value: '1' },
            { label: 'Kỳ Nam', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Chi nhánh"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Chọn chi nhánh</option>
          {stores.map((store) => (
            <option key={store.Store_ID} value={store.Store_ID}>
              {store.Store_Name}
            </option>
          ))}
        </CFormSelect>
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Phương thức thanh toán"
          options={[
            'Chọn phương thức thanh toán',
            { label: 'Thanh toán khi nhận hàng', value: '1' },
            { label: 'Tài khoản ngân hàng', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Trạng thái đơn hàng"
          options={[
            'Chọn trạng thái đơn hàng',
            { label: 'Chờ xác nhận', value: '0' },
            { label: 'Đang giao', value: '1' },
            { label: 'Hoàn thành', value: '2' },
            { label: 'Đã hủy', value: '3' },
          ]}
        />
        <CButton color="primary" style={{ marginRight: '10px' }}>
          Thêm
        </CButton>
        <CButton color="danger">Hủy</CButton>
      </CForm>
      <></>
    </>
  )
}

export default Order_Add
