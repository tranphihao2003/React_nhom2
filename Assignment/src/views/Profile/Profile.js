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
  CFormCheck,
  CProgress,
  CTooltip,
  CPlaceholder,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from '@coreui/react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { cilArrowTop, cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as API_Employee from '../../services/API/API_Employees'
import * as API_Orders from '../../services/API/API_Orders'
import { useAuth } from '../../contexts/AuthContext'
const Profile = () => {
  const { user } = useAuth()
  const [info, setInfo] = React.useState({})
  const [quantity, setQuantity] = React.useState(20)
  const [progress, setProgress] = React.useState(0)
  const [selectedMoc, setSelectedMoc] = React.useState('0')
  const [mocthuong, setMocThuong] = React.useState({
    moc1: 200000,
    moc2: 300000,
    moc3: 400000,
    moc4: 500000,
    moc5: 600000,
  })
  const [qtyoder, setQtyoder] = React.useState(0)
  useEffect(() => {
    const progressPercentage = (quantity / 30) * 100
    setProgress(progressPercentage)
    if (quantity >= 30) setSelectedMoc(mocthuong.moc5)
    else if (quantity >= 25) setSelectedMoc(mocthuong.moc4)
    else if (quantity >= 20) setSelectedMoc(mocthuong.moc3)
    else if (quantity >= 15) setSelectedMoc(mocthuong.moc2)
    else if (quantity >= 10) setSelectedMoc(mocthuong.moc1)
    else setSelectedMoc('0')
    getinfo()
  }, [quantity, mocthuong])
  async function getinfo() {
    const response = await API_Employee.getinfo(user?.Employee_ID)
    const { data: info } = response
    const thongkeoder = await API_Orders.thongkebyemployee(user?.Employee_ID, 8, 2024)
    setQtyoder(thongkeoder)

    setInfo(info[0])
  }
  return (
    <CRow>
      <CCol xs="12" sm="6" md="4">
        <CCard>
          <CCardHeader className="text-center">Thông tin cá nhân</CCardHeader>

          <CCardBody>
            <CImage
              style={{ borderRadius: '50%' }}
              align="center"
              fluid
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=sph"
              width={200}
              height={200}
            />
            <h5 className="text-center mt-3">{info.Employee_FullName}</h5>
            <p className="text-center m-2">Chức vụ : {info.Position}</p>
            <p className="text-center m-2">Cơ sở : {info.Store_Name}</p>
            {/* <p className="text-center m-2">Số điện thoại : 0123456789</p>
            <p className="text-center m-2">Email : tranphihao2k3@gmail.com </p> */}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" sm="6" md="8">
        <CCard>
          <CCardHeader className="text-center">Thống kê năng xuất</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="primary"
                  value={
                    <>
                      12/30 <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Số ngày làm việc"
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="danger"
                  value={
                    <>
                      {(info?.Salary?.toLocaleString('vi-VN', {}) || '0 VNĐ') + ' VNĐ'}{' '}
                    
                    </>
                  }
                  title="Tiền lương cơ bản"
                />
              </CCol>

              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="info"
                  value={
                    <>
                      {qtyoder} sản phẩm <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Doanh số bán hàng"
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4 pb-4"
                  color="success"
                  value={
                    <>
                      {(qtyoder * 15000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}{' '}
                    </>
                  }
                  title="Tiền thưởng trên mỗi sản phẩm"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      {/* <CCol xs="12" sm="12" md="12" className="p-3">
        <CCard>
          <CCardHeader>Thưởng theo Doanh số</CCardHeader>
          <CCardBody>
            <CCol xs="12" sm="12" md="12">
              <CRow>
                <CCol xs="2" sm="22" md="22">
                  <CTooltip content="Bán được 5 sản phẩm thưởng 100k" placement="top">
                    <CFormCheck
                      type="radio"
                      name="progress0"
                      id="exampleRadios1"
                      value="0"
                      label="Mức thưởng 0"
                      checked={quantity < 5}
                      disabled
                    />
                  </CTooltip>
                </CCol>
                <CCol xs="2" sm="22" md="22">
                  <CTooltip content="Bán được 10 sản phẩm thưởng 200k" placement="top">
                    <CFormCheck
                      type="radio"
                      name="progress20"
                      id="exampleRadios1"
                      label="Mức thưởng 1"
                      value={mocthuong.moc1}
                      checked={quantity >= 10 && quantity < 15}
                    />
                  </CTooltip>
                </CCol>
                <CCol xs="2" sm="22" md="22">
                  <CTooltip content="Bán được 15 sản phẩm thưởng 300k" placement="top">
                    <CFormCheck
                      type="radio"
                      name="progress40"
                      id="exampleRadios1"
                      value={mocthuong.moc2}
                      label="Mức thưởng 2"
                      checked={quantity >= 15 && quantity < 20}
                    />
                  </CTooltip>
                </CCol>
                <CCol xs="2" sm="22" md="22">
                  <CTooltip content="Bán được 20 sản phẩm thưởng 400k" placement="top">
                    <CFormCheck
                      type="radio"
                      name="progress60"
                      id="exampleRadios1"
                      value={mocthuong.moc3}
                      label="Mức thưởng 3"
                      checked={quantity >= 20 && quantity < 25}
                    />
                  </CTooltip>
                </CCol>
                <CCol xs="2" sm="22" md="22">
                  <CTooltip content="Bán được 25 sản phẩm thưởng 500k" placement="top">
                    <CFormCheck
                      type="radio"
                      name="progress80"
                      id="exampleRadios1"
                      label="Mức thưởng 4"
                      value={mocthuong.moc4}
                      checked={selectedMoc === mocthuong.moc4}
                    />
                  </CTooltip>
                </CCol>
                <CCol xs="2" sm="22" md="22">
                  <CTooltip content="Bán được 30 sản phẩm thưởng 600k" placement="top">
                    <CFormCheck
                      type="radio"
                      name="progress100"
                      id="exampleRadios1"
                      value={mocthuong.moc5}
                      label="Mức thưởng 5"
                      checked={selectedMoc === mocthuong.moc5}
                    />
                  </CTooltip>
                </CCol>
              </CRow>
            </CCol>
            <CCol xs="12" sm="12" md="12" className="">
              <CProgress animated color="danger" variant="striped" value={progress}>
                {' '}
                {quantity >= 30 ? '100%' : `${progress.toFixed(1)}%`} {quantity} sản phẩm
              </CProgress>
            </CCol>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol> */}
    </CRow>
  )
}

export default Profile
