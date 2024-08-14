import {
  CTable,
  CButton,
  CFormSelect,
  CFormLabel,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CCard,
} from '@coreui/react'

import * as API_Order from '../../services/API/API_Orders'
import * as API_Product from '../../services/API/API_Product'
import * as API_Store from '../../services/API/API_Store'
import * as API_Employees from '../../services/API/API_Employees'
import * as API_Store_Product from '../../services/API/API_Store_Product'
import * as API_Customers from '../../services/API/API_Customers'
import * as API_Order_Detail from '../../services/API/API_Order_Detail'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalComponent from '../../components/modal/modalComponent'
import AppHeaderHistory from '../../components/AppheaderHisory'
import { useState, useEffect, React } from 'react'
import { useSelect } from 'react-select-search'
import { useForm } from 'react-hook-form'
import { auto } from '@popperjs/core'

const Order_Add = () => {
  const [items, setItems] = useState([])
  const [stores, setStores] = useState([])
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])

  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedStore, setSelectedStore] = useState('')
  const [selectedCustomers, setSelectedCustomers] = useState('')
  const [selectedEmployees, setSelectedEmployees] = useState('')
  const [productOrderList, setProductOrderList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const navigate = useNavigate()

  // const [formData, setFormData] = useState({
  //   Customer_ID: '',
  //   Store_ID: '',
  //   Order_Date: '',
  //   Employee_ID: '',
  //   Payment_Methods: '',
  //   Status: '',
  //   Total_Amount: totalPrice,
  // })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      Customer_ID: '',
      Store_ID: '',
      Order_Date: '',
      Employee_ID: '',
      Payment_Methods: '',
      Status: '',
      Total_Amount: totalPrice,
    },
  })

  useEffect(() => {
    get_data()
  }, [])

  async function get_data() {
    // Get thằng chi nhánh
    const store = await API_Store.getStore(1, 100)

    render_data_store(store.data.stores)

    const customers = await API_Customers.getCustomers(1, 100)
    render_data_customers(customers.data.customers)

    const employees = await API_Employees.getEmployees(1, 100)
    console.log(employees.data.employees)

    render_data_employees(employees.data.employees)
  }

  async function onSelectStore(store_id) {
    setSelectedStore(store_id)
    // setFormData({
    //   ...formData,
    //   Store_ID: store_id, // Cập nhật Store_ID vào formData
    // })
    setValue('Store_ID', store_id)
    if (store_id) {
      const storeProducts = await API_Store_Product.getAllStoreProductAdd(store_id)
      render_data(storeProducts)
    } else {
      setItems([]) // Reset lại danh sách sản phẩm nếu không có chi nhánh nào được chọn
    }
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
  function render_data_employees(items) {
    setEmployees(
      items.map((item, index) => {
        return item
      }),
    )
  }

  function updateTotalPrice(updatedProductOrderList) {
    const newTotalPrice = updatedProductOrderList.reduce((total, product) => {
      return total + product.Product_Price
    }, 0)
    setTotalPrice(newTotalPrice)
  }

  async function onSelectProduct(product_id) {
    // setFormData({
    //   ...formData,
    //   Product_ID: product_id,
    // })
    setValue('Product_ID', product_id)
    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
    const existingProduct = productOrderList.find((product) => product.Product_ID == product_id)

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      console.log('Sản phẩm đã tồn tại')
      incqty(product_id)
    } else {
      // Nếu sản phẩm chưa tồn tại, lấy thông tin sản phẩm từ API và thêm vào danh sách
      console.log('Sản phẩm chưa tồn tại')
      try {
        const res = await API_Store_Product.getProductById(selectedStore, product_id)
        const newProduct = {
          Product_ID: res.Product_ID,
          Product_Name: res.Product_Name,
          Original_Price: res.Product_Price,
          Product_Price: res.Product_Price,
          Quantity: 1,
          Product_Stock: res.Product_Stock,
        }

        const updatedProductOrderList = [...productOrderList, newProduct]
        setProductOrderList(updatedProductOrderList)
        updateTotalPrice(updatedProductOrderList)
      } catch (err) {
        console.error(err)
      }
    }
  }

  // Hàm trừ
  function truqty(id) {
    const updatedProductOrderList = productOrderList.map((product) => {
      if (product.Product_ID === id) {
        const newQuantity = product.Quantity - 1 < 1 ? 1 : product.Quantity - 1
        return {
          ...product,
          Quantity: newQuantity,
          Product_Price: newQuantity * product.Original_Price,
        }
      }
      return product
    })

    setProductOrderList(updatedProductOrderList)
    updateTotalPrice(updatedProductOrderList)
  }

  // Hàm cộng
  function incqty(id) {
    const updatedProductOrderList = productOrderList.map((product) => {
      if (product.Product_ID == id) {
        const newQuantity = product.Quantity + 1

        if (newQuantity <= product.Product_Stock) {
          return {
            ...product,
            Quantity: newQuantity,
            Product_Price: newQuantity * product.Original_Price,
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Bạn chỉ có thể mua tối đa ${product.Product_Stock} sản phẩm này!`,
          })
        }
      }
      return product
    })

    setProductOrderList(updatedProductOrderList)
    updateTotalPrice(updatedProductOrderList)
  }

  // Hàm xóa
  function delete_item(id) {
    const updatedProductOrderList = productOrderList.filter((e) => e.Product_ID !== id)

    setProductOrderList(updatedProductOrderList)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)

    // Lấy ngày, tháng, năm
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Tháng bắt đầu từ 0, thêm 1 và định dạng với 2 chữ số
    const day = ('0' + date.getDate()).slice(-2) // Định dạng với 2 chữ số

    return `${year}-${month}-${day}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'Order_Date') {
      const formattedDate = formatDate(value)
      setFormData({
        ...formData,
        [name]: formattedDate,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const form = event.currentTarget

  //   if (form.checkValidity() === false) {
  //     event.stopPropagation()
  //   } else {
  //     await createOrder() // Tạo đơn hàng
  //   }
  //   // setValidated(true)
  // }

  const createOrder = async (data) => {
    try {
      const orderData = {
        Customer_ID: data.Customer_ID,
        Store_ID: data.Store_ID,
        Order_Date: formatDate(data.Order_Date),
        Employee_ID: data.Employee_ID,
        Payment_Methods: data.Payment_Methods,
        Status: data.Status,
        Total_Amount: totalPrice,
      }

      // Gửi yêu cầu tạo đơn hàng
      const orderResponse = await API_Order.createOrder(orderData)

      const newOrderID = orderResponse.insertId
      console.log(orderResponse)

      // Tạo chi tiết đơn hàng với Order_ID vừa được tạo
      await Promise.all(
        productOrderList.map(async (product) => {
          const orderDetailData = {
            Order_ID: newOrderID,
            Product_ID: product.Product_ID,
            Quantity: product.Quantity,
            Price: product.Product_Price,
          }

          await API_Order_Detail.createOrderDetail(orderDetailData)
        }),
      )

      // setStatus(true)
      setTimeout(() => {
        navigate('/orders')
      }, 700)
    } catch (error) {
      // setStatus(false)
      console.error('Failed to create order:', error)
    }
  }

  return (
    <CCard style={{ padding: '10px' }}>
      <>
        <h2>Thêm đơn hàng</h2>
        <CForm style={{ margin: '10px' }} onSubmit={handleSubmit(createOrder)}>
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Khách hàng"
            name="Customer_ID"
            // value={formData.Customer_ID}
            // onChange={handleChange}
            {...register('Customer_ID', { required: 'Vui lòng chọn khách hàng!' })}
          >
            <option value="">Chọn khách hàng</option>
            {customers.map((customer) => (
              <option key={customer.Customer_ID} value={customer.Customer_ID}>
                {customer.First_Name} {customer.Last_Name}
              </option>
            ))}
          </CFormSelect>
          {errors.Customer_ID && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Customer_ID.message}</span>
          )}

          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Chi nhánh"
            name="Store_ID"
            // value={formData.Store_ID}
            {...register('Store_ID', { required: 'Vui lòng chọn chi nhánh!' })}
            onChange={(e) => onSelectStore(e.target.value)}
          >
            <option value="">Chọn chi nhánh</option>
            {stores.map((store) => (
              <option key={store.Store_ID} value={store.Store_ID}>
                {store.Store_Name}
              </option>
            ))}
          </CFormSelect>
          {errors.Store_ID && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Store_ID.message}</span>
          )}

          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Sản phẩm"
            name="Product_ID"
            // value={formData.Product_ID}
            {...register('Product_ID', { required: 'Vui lòng chọn sản phẩm!' })}
            onChange={(e) => onSelectProduct(e.target.value)}
          >
            <option value="">Chọn sản phẩm</option>
            {items.map((product) => (
              <option key={product.Product_ID} value={product.Product_ID}>
                {product.Product_Name}
              </option>
            ))}
          </CFormSelect>
          {errors.Product_ID && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Product_ID.message}</span>
          )}
          <ul
            style={{
              maxHeight: 300,
              overflow: auto,
            }}
          >
            {productOrderList.map((item, index) => (
              <li key={index} className="m-2">
                <CRow>
                  <CCol xl={3}>{item.Product_Name}</CCol>
                  <CCol xl={4}>
                    <CRow>
                      <CCol xl={2}>
                        <CButton onClick={() => truqty(item.Product_ID)}>-</CButton>
                      </CCol>
                      <CCol xl={8}>
                        <CFormInput
                          className="text-center"
                          name="Quantity"
                          value={item.Quantity}
                          type="number"
                          readOnly
                        ></CFormInput>
                      </CCol>
                      <CCol xl={2}>
                        <CButton onClick={() => incqty(item.Product_ID)}>+</CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xl={3} className="align-items-center d-flex justify-content-center">
                    {item.Product_Price.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </CCol>
                  <CCol xl={2}>
                    <CButton onClick={() => delete_item(item.Product_ID)}>Xóa</CButton>
                  </CCol>
                </CRow>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h5>
              Tổng tiền:{totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
            </h5>
          </div>
          <CFormInput
            style={{ marginBottom: '10px' }}
            type="date"
            name="Order_Date"
            label="Ngày đặt hàng"
            // value={formData.Order_Date}
            {...register('Order_Date', { required: 'Vui lòng chọn ngày đặt hàng!' })}
            // onChange={handleChange}
          />
          {errors.Order_Date && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Order_Date.message}</span>
          )}
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Nhân viên nhập đơn"
            name="Employee_ID"
            // value={formData.Employee_ID}
            // onChange={handleChange}
            {...register('Employee_ID', { required: 'Vui lòng chọn nhân viên nhập đơn!' })}
          >
            <option value="">Chọn nhân viên</option>
            {employees.map((employee) => (
              <option key={employee.Employee_ID} value={employee.Employee_ID}>
                {employee.Employee_FullName}
              </option>
            ))}
          </CFormSelect>
          {errors.Employee_ID && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Employee_ID.message}</span>
          )}
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Phương thức thanh toán"
            name="Payment_Methods"
            // value={formData.Payment_Methods}
            // onChange={handleChange}
            {...register('Payment_Methods', { required: 'Vui lòng chọn phương thức thanh toán!' })}
            options={[
              { label: 'Chọn phương thức thanh toán', value: '' },
              { label: 'Thanh toán khi nhận hàng', value: '1' },
              { label: 'Chuyển khoản ngân hàng', value: '2' },
            ]}
          />
          {errors.Payment_Methods && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Payment_Methods.message}</span>
          )}
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Trạng thái đơn hàng"
            name="Status"
            // value={formData.Status}
            // onChange={handleChange}
            {...register('Status', { required: 'Vui lòng chọn trạng thái!' })}
            options={[
              { label: 'Chọn trạng thái đơn hàng', value: '' },
              { label: 'Chờ xác nhận', value: '0' },
              { label: 'Đang giao', value: '1' },
              { label: 'Hoàn thành', value: '2' },
              { label: 'Đã hủy', value: '3' },
            ]}
          />
          {errors.Status && (
            <span style={{ color: 'red', display: 'block' }}>{errors.Status.message}</span>
          )}
          <CButton color="primary" style={{ marginRight: '10px' }} type="submit">
            Thêm
          </CButton>
          <CButton color="danger" onClick={() => navigate('/orders')}>
            Hủy
          </CButton>
        </CForm>
        <></>
      </>
    </CCard>
  )
}

export default Order_Add
