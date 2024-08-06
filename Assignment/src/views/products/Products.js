import React, { useState, useEffect } from 'react'
import { CTable, CPagination, CPaginationItem, CCard, CCardHeader, CRow, CCol } from '@coreui/react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Link, useSearchParams, useNavigate, useParams } from 'react-router-dom'
import * as API from '../../services/API/API_Product'
import ModalComponent from '../../components/modal/modalComponent'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AppHeaderHistory from '../../components/AppheaderHisory'

const Products = () => {
  // Phân trang
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  })
  const [reloadheader, setreloadheader] = useState(false)

  function handlePageChange(newpage) {
    searchParams.set('page', newpage)
    navigate(`/products?${searchParams.toString()}`)
    getdata(newpage, pagination.pageSize)
  }
  // data
  const [items, setItems] = useState([])
  useEffect(() => {
    document.title = 'Thông tin sản phẩm'
    getdata(pagination.page, pagination.pageSize)
  }, [])
  const getdata = (page, pageSize) => {
    API.getProducts(page, pageSize).then((res) => {
      const { data } = res

      setPagination({
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      renderdata(data.products)
    })
  }
  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.STT = index + 1
        if (item.status === 0) {
          item.status = <span className="badge bg-success">Đang hoạt động</span>
        } else if (item.Product_Status === 1) {
          item.status = <span className="badge bg-danger">Ngừng hoạt động</span>
        } else {
          item.status = <span className="badge bg-warning">hết hàng</span>
        }

        item.Product_Image = <img src={`${item.Product_Image}`} alt="Album ABC" width={50} />
        item.Product_Price = item.Product_Price.toLocaleString('vi-VN') + ' VNĐ'
        item.actions = (
          <>
            <ModalComponent
              id={item.Product_ID}
              nameitems={item.Product_Name}
              color="danger"
              content="bạn muốn Tạm ngưng sản phẩm? 
                sau khi xóa vào thùng rác bạn có thể khôi phục lại"
              icon="cilTrash"
              status="Tạm Ngưng"
              actions={deleteacp}
            ></ModalComponent>{' '}
            <ModalComponent
              id={item.Product_ID}
              nameitems={item.Product_Name}
              color="primary"
              content="bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Chỉnh sửa"
              actions={editacp}
            ></ModalComponent>
          </>
        )
        return item
      }),
    )
  }
  //  chức năng
  const deleteacp = (id) => {
    API.changestatus(id, 1).then((res) => {
      ShowSwal('success', 'Xóa thành công')
      getdata(pagination.page, pagination.pageSize)
      setreloadheader((reloadheader) => !reloadheader)
    })
  }
  const editacp = (id) => {
    navigate(`/products/${id}`)
  }
  // noti
  const ShowSwal = (status, title) => {
    withReactContent(Swal).fire({
      position: 'center',
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1000,
    })
  }
  const columns = [
    {
      key: 'STT',
      label: 'STT',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Name',
      label: 'Tên sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Image',
      label: 'Hình ảnh',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Artist',
      label: 'Nghệ sĩ',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Price',
      label: 'Giá (VNĐ)',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Stock',
      label: 'Số lượng',
      _props: { scope: 'col' },
    },
    {
      key: 'trangthai',
      label: 'Số lượng',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      _props: { scope: 'col' },
    },
  ]

  return (
    <CCard>
      <CCardHeader>
        <CRow className="align-items-center">
          <CCol sm="3">
            <h5 id="traffic" className="card-title mb-0">
              Danh sách sản phẩm
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Product_ID"
              API={API}
              path="products"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/products/add')}
              color="primary"
              className="float-end me-2 px-4 text-white"
            >
              <CIcon icon={icon.cilPlus} /> Thêm mới
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <div
        style={{
          minHeight: '70vh',
        }}
      >
        <CTable striped hover columns={columns} items={items} />
        {items.length === 0 && (
          <div className="text-center mt-3">
            <h5>Không có dữ liệu</h5>
          </div>
        )}
      </div>
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem
          disabled={pagination.page <= 1}
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
          <CPaginationItem
            key={page}
            active={page === pagination.page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={pagination.page === pagination.totalPages}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          {' '}
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </CCard>
  )
}

export default Products
