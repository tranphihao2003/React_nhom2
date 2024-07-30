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
} from '@coreui/react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { cilArrowTop, cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Profile = () => {
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

  useEffect(() => {
    const progressPercentage = (quantity / 30) * 100
    setProgress(progressPercentage)
    if (quantity >= 30) setSelectedMoc(mocthuong.moc5)
    else if (quantity >= 25) setSelectedMoc(mocthuong.moc4)
    else if (quantity >= 20) setSelectedMoc(mocthuong.moc3)
    else if (quantity >= 15) setSelectedMoc(mocthuong.moc2)
    else if (quantity >= 10) setSelectedMoc(mocthuong.moc1)
    else setSelectedMoc('0')
  }, [quantity, mocthuong])
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
            <h5 className="text-center mt-3">Nguyễn Văn A</h5>
            <p className="text-center m-2">Chức vụ : Nhân viên</p>
            <p className="text-center m-2">Cơ sở : Cơ sở 1</p>
            <p className="text-center m-2">Số điện thoại : 0123456789</p>
            <p className="text-center m-2">Email : tranphihao2k3@gmail.com </p>
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
                  className="mb-4"
                  color="primary"
                  value={
                    <>
                      12/30 <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Số ngày làm việc"
                  chart={
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'Tháng 1',
                          'Tháng 2',
                          'Tháng 3',
                          'Tháng 4',
                          'Tháng 5',
                          'Tháng 6',
                          'Tháng 7',
                        ],
                        datasets: [
                          {
                            label: 'Số ngày làm việc',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            pointBackgroundColor: '#5856d6',
                            data: [30, 29, 28, 27, 26, 25, 24],
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            border: {
                              display: false,
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 20,
                            max: 30,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  }
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4"
                  color="danger"
                  value={
                    <>
                      3,000,000 <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Hoa hồng tháng này"
                  chart={
                    <CChartBar
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'Tháng 1',
                          'Tháng 2',
                          'Tháng 3',
                          'Tháng 4',
                          'Tháng 5',
                          'Tháng 6',
                          'Tháng 7',
                          'Tháng 8',
                          'Tháng 9',
                          'Tháng 10',
                          'Tháng 11',
                          'Tháng 12',
                        ],
                        datasets: [
                          {
                            label: 'Lương hằng Tháng',
                            backgroundColor: 'rgba(255,255,255,.2)',
                            borderColor: 'rgba(255,255,255,.55)',
                            data: [
                              13000000, 12000000, 11000000, 10000000, 9000000, 8000000, 7000000,
                              6000000, 5000000, 4000000, 3000000, 2000000,
                            ],
                            barPercentage: 0.6,
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawTicks: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            border: {
                              display: false,
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                              drawTicks: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  }
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4"
                  color="info"
                  value={
                    <>
                      200 sản phẩm <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Doanh số bán hàng"
                  chart={
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'Tháng 1',
                          'Tháng 2',
                          'Tháng 3',
                          'Tháng 4',
                          'Tháng 5',
                          'Tháng 6',
                          'Tháng 7',
                        ],
                        datasets: [
                          {
                            label: 'Doanh số bán hàng',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            pointBackgroundColor: '#5856d6',
                            data: [2000, 2500, 3000, 3500, 4000, 4500, 5000],
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            border: {
                              display: false,
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 1000,
                            max: 6000,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  }
                />
              </CCol>
              <CCol sm="6">
                <CWidgetStatsA
                  className="mb-4"
                  color="success"
                  value={
                    <>
                      4,000,000 <span className="fs-6 fw-normal">(40.9%)</span>
                    </>
                  }
                  title="Tiền thưởng"
                  chart={
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'Tháng 1',
                          'Tháng 2',
                          'Tháng 3',
                          'Tháng 4',
                          'Tháng 5',
                          'Tháng 6',
                          'Tháng 7',
                        ],
                        datasets: [
                          {
                            label: 'Tiền thưởng',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            pointBackgroundColor: '#5856d6',
                            data: [1000, 1500, 2000, 2500, 3000, 3500, 4000],
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            border: {
                              display: false,
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 500,
                            max: 4500,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  }
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" sm="12" md="12" className="p-3">
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
              <CProgress animated  color="danger" variant="striped" value={progress}>
                {' '}
                {quantity >= 30 ? '100%' : `${progress.toFixed(1)}%`} {quantity} sản phẩm
              </CProgress>
            </CCol>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
