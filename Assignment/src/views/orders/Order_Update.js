import { CTable, CButton, CFormSelect, CForm, CFormInput, CRow, CCol, CCard } from '@coreui/react'

import * as API_Order from '../../services/API/API_Order'
import * as API_Product from '../../services/API/API_Product'
import * as API_Store from '../../services/API/API_Store'
import * as API_Employees from '../../services/API/API_Employees'
import * as API_Store_Product from '../../services/API/API_Store_Product'
import * as API_Customers from '../../services/API/API_Customers'
import * as API_Order_Detail from '../../services/API/API_Order_Detail'

import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

const Order_Edit = () => {
  const [items, setItems] = useState([])
  const [stores, setStores] = useState([])
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [productOrderList, setProductOrderList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [formData, setFormData] = useState({
    Order_ID: '',
    Customer_ID: '',
    Store_ID: '',
    Order_Date: '',
    Employees_ID: '',
    Payment_Methods: '',
    Status: '',
    Total_Amount: totalPrice,
  })

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    get_data()
    fetchOrderDetails()
  }, [])

  async function get_data() {
    const store = await API_Store.getAllStoreAdd()
    render_data_store(store)

    const customers = await API_Customers.getAllCustomerAdd()
    render_data_customers(customers)

    const employees = await API_Employees.getAllEmpoyeesAdd()
    render_data_employees(employees)
  }
  function formatDate(dateString) {
    const date = new Date(dateString)

    // Lấy ngày, tháng, năm
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Tháng bắt đầu từ 0, thêm 1 và định dạng với 2 chữ số
    const day = ('0' + date.getDate()).slice(-2) // Định dạng với 2 chữ số

    return `${year}-${month}-${day}`
  }
  async function fetchOrderDetails() {
    try {
      const order = await API_Order.getOrder_Detail(id)
      const orderDetails = await API_Order_Detail.getOrder_Detail(id)
      order[0].Order_Date = formatDate(order[0].Order_Date)

      setFormData({
        Order_ID: order[0].Order_ID,
        Customer_ID: order[0].Customer_ID,
        Store_ID: order[0].Store_ID,
        Order_Date: order[0].Order_Date,
        Employee_ID: order[0].Employee_ID,
        Payment_Methods: order[0].Payment_Methods,
        Status: order[0].Status,
        Total_Amount: order[0].Total_Amount,
      })

      // Prepopulate the product order list
      const products = orderDetails.map((detail) => ({
        Product_ID: detail.Product_ID,
        Product_Name: detail.Product_Name,
        Original_Price: detail.Price / detail.Quantity, // Calculate original price
        Product_Price: detail.Price,
        Quantity: detail.Quantity,
        Product_Stock: detail.Product_Stock, // Assume you have this info
      }))

      setProductOrderList(products)
      updateTotalPrice(products)

      // Fetch available products for the selected store
      if (order.Store_ID) {
        const storeProducts = await API_Store_Product.getAllStoreProductAdd(order.Store_ID)
        render_data(storeProducts)
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error)
    }
  }

  function render_data(items) {
    setItems(items)
  }

  function render_data_store(items) {
    setStores(items)
  }

  function render_data_customers(items) {
    setCustomers(items)
  }

  function render_data_employees(items) {
    setEmployees(items)
  }

  function updateTotalPrice(updatedProductOrderList) {
    const newTotalPrice = updatedProductOrderList.reduce((total, product) => {
      return total + product.Product_Price
    }, 0)
    setTotalPrice(newTotalPrice)
  }

  async function onSelectStore(store_id) {
    setFormData({ ...formData, Store_ID: store_id })

    if (store_id) {
      const storeProducts = await API_Store_Product.getAllStoreProductAdd(store_id)
      render_data(storeProducts)
    } else {
      setItems([])
    }
  }

  async function onSelectProduct(product_id) {
    const existingProduct = productOrderList.find((product) => product.Product_ID === product_id)

    if (existingProduct) {
      incqty(product_id)
    } else {
      try {
        const res = await API_Store_Product.getProductById(formData.Store_ID, product_id)
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

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'Order_Date') {
      const [year, month, day] = value.split('-')
      const formattedDate = `${year}-${month}-${day}`
      setFormData({
        ...formData,
        [name]: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      await updateOrder()
    }
  }

  // const updateOrder = async () => {
  //   try {
  //     await Order_Class.updateOrder(formData.Order_ID, formData)

  //     // await Promise.all(
  //     //   productOrderList.map(async (product) => {
  //     //     const orderDetailData = {
  //     //       Order_ID: formData.Order_ID,
  //     //       Product_ID: product.Product_ID,
  //     //       Quantity: product.Quantity,
  //     //       Price: product.Product_Price,
  //     //     }
  //     //     await Order_Class.updateOrderDetail(orderDetailData)
  //     //   })
  //     // )

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Order updated successfully!',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     })

  //     setTimeout(() => {
  //       navigate('/orders')
  //     }, 700)
  //   } catch (error) {
  //     console.error('Failed to update order:', error)
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Failed to update order!',
  //     })
  //   }
  // }
  const updateOrder = async () => {
    const orderData = {
      ...formData,
      Order_Date: formData.Order_Date,
    }
    API_Order.updateOrder(orderData)
      .then((response) => {
        // setStatus2(true)
        setTimeout(() => {
          navigate('/orders')
        }, 200)
      })
      .catch((error) => {
        console.error('Error updating store:', error)
        // setStatus2(false)
      })
  }

  return (
    <CCard style={{ padding: '10px' }}>
      <>
        <h2>Sửa đơn hàng</h2>
        <CForm style={{ margin: '10px' }} onSubmit={handleSubmit}>
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Khách hàng"
            name="Customer_ID"
            value={formData.Customer_ID}
            onChange={handleChange}
            disabled
          >
            <option value="">Chọn khách hàng</option>
            {customers.map((customer) => (
              <option key={customer.Customer_ID} value={customer.Customer_ID}>
                {customer.First_Name} {customer.Last_Name}
              </option>
            ))}
          </CFormSelect>
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Chi nhánh"
            name="Store_ID"
            value={formData.Store_ID}
            onChange={(e) => onSelectStore(e.target.value)}
            disabled
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
            label="Sản phẩm"
            name="Product_ID"
            value={formData.Product_ID}
            onChange={(e) => onSelectProduct(e.target.value)}
            disabled
          >
            <option value="">Chọn sản phẩm</option>
            {items.map((product) => (
              <option key={product.Product_ID} value={product.Product_ID}>
                {product.Product_Name}
              </option>
            ))}
          </CFormSelect>
          <ul
            style={{
              maxHeight: 300,
              // overflow: auto,
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
                          disabled
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
              Tổng tiền: {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
            </h5>
          </div>
          <CFormInput
            style={{ marginBottom: '10px' }}
            type="date"
            name="Order_Date"
            label="Ngày đặt hàng"
            value={formData.Order_Date}
            onChange={handleChange}
            disabled
          />
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Nhân viên nhập đơn"
            name="Employee_ID"
            value={formData.Employee_ID}
            onChange={handleChange}
            disabled
          >
            <option value="">Chọn nhân viên</option>
            {employees.map((employee) => (
              <option key={employee.Employee_ID} value={employee.Employee_ID}>
                {employee.First_Name}
                {employee.Last_Name}
              </option>
            ))}
          </CFormSelect>
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Phương thức thanh toán"
            name="Payment_Methods"
            value={formData.Payment_Methods}
            onChange={handleChange}
            disabled
            options={[
              'Chọn phương thức thanh toán',
              { label: 'Thanh toán khi nhận hàng', value: '1' },
              { label: 'Tài khoản ngân hàng', value: '2' },
            ]}
          />
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Trạng thái đơn hàng"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            options={[
              'Chọn trạng thái đơn hàng',
              { label: 'Chờ xác nhận', value: '0' },
              { label: 'Đang giao', value: '1' },
              { label: 'Hoàn thành', value: '2' },
              { label: 'Đã hủy', value: '3' },
            ]}
          />
          <CButton color="primary" style={{ marginRight: '10px' }} type="submit">
            Cập nhật
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

export default Order_Edit
