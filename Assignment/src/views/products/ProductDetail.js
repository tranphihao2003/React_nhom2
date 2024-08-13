import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsA,
  CImage,
  CCardFooter,
  CButton,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilCheckCircle, cilBan } from '@coreui/icons'
import * as API_Product from '../../services/API/API_Product'
import * as API_Oders from '../../services/API/API_Orders'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
const ProductDetail = () => {
  const { user } = useAuth()
  console.log(user)

  const navigate = useNavigate()
  const { id } = useParams()
  const [Product, setProduct] = React.useState({})
  const [Thongke, setThongke] = React.useState({})

  useEffect(() => {
    document.title = 'Sản phẩm chi tiết'
    getdata(id)
  }, [id])

  async function getdata(id) {
    try {
      const response = await API_Product.getProductById(id)
      if (response.status === 200) {
        response.data[0].Product_Price = response.data[0].Product_Price.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ',',
        )
        setProduct(response.data[0])
      }
      const response1 = await API_Oders.thongkebyid(id, user.store, 8, 2024)
      console.log(response1)

      setThongke(response1)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function toggleProductStatus(id) {
    const newStatus = Product.status === 0 ? 1 : 0
    const action = Product.status === 0 ? 'Ngưng kinh doanh' : 'Tiếp tục'

    try {
      const response = await API_Product.changestatus(id, newStatus)
      if (response.status === 201) {
        getdata(id)
      }
    } catch (error) {
      console.error('Error changing status:', error)
    }
  }

  return (
    <CRow>
      <CCol xs="12" sm="6" md="4">
        <CCard>
          <CCardHeader className="text-center">Thông tin sản phẩm</CCardHeader>
          <CCardBody>
            <CImage
              style={{ borderRadius: '50%' }}
              align="center"
              fluid
              src={Product.Product_Image}
              width={200}
              height={200}
            />
            <h5 className="text-center mt-3">{Product.Product_Name}</h5>
            <h5 className="text-center mt-3">{Product.Product_Artist}</h5>
            <h5 className="text-center mt-3">{Product.Product_Price} VNĐ</h5>
            <h5 className="text-center mt-3">Số lượng: {Product.Product_Stock}</h5>
            <h5 className="text-center mt-3">
              Trạng thái:{' '}
              {Product.status === 0 ? (
                <CBadge color="success">Đang kinh doanh</CBadge>
              ) : (
                <CBadge color="danger">Ngưng kinh doanh</CBadge>
              )}
            </h5>
          </CCardBody>
          <CCardFooter>
            <CCol className="text-center">
              <CButton
                onClick={() => navigate(`/products/${Product.Product_ID}`)}
                color="primary"
                className="me-2 px-4 text-white"
              >
                <CIcon icon={cilOptions} /> Sửa
              </CButton>
              <CButton
                onClick={() => toggleProductStatus(Product.Product_ID)}
                color={Product.status === 0 ? 'danger' : 'success'}
                className="me-2 px-4 text-white"
              >
                <CIcon icon={Product.status === 0 ? cilBan : cilCheckCircle} />
                {Product.status === 0 ? 'Ngưng kinh doanh' : 'Tiếp tục'}
              </CButton>
            </CCol>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs="12" sm="6" md="8">
        <CCard>
          <CCardHeader className="text-center">Thống kê năng suất</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="primary"
                  value={
                    <>
                      {Thongke.Total_Quantity} - Sản phẩm{' '}
                      <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Số sản phẩm đã bán trong tháng"
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="danger"
                  value={
                    <>
                      {(Thongke?.Total_Revenue?.toLocaleString('vi-VN', {}) || '0 VNĐ') + ' VNĐ'}{' '}
                    </>
                  }
                  title="Tổng doanh thu trong tháng"
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="info"
                  value={
                    <>
                      {Thongke.Total_Orders} - Đơn hàng{' '}
                      <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Doanh số đơn hàng"
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="success"
                  value={
                    <>
                      {(Thongke?.Average_Price?.toLocaleString('vi-VN', {}) || '0 VNĐ') + ' VNĐ'}{' '}
                      <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Trung bình giá trên mỗi sản phẩm"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductDetail
