import React, { useEffect, useState } from 'react';
import {
  CButton,
  CTable,
  CPagination,
  CPaginationItem,
  CCard,
  CCardHeader,
  CRow,
  CCol,
} from '@coreui/react';
import API_Store_Products from '../../services/API/API_Store_Products';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ModalComponent from '../../components/modal/modalComponent';
import AppHeaderHistory from '../../components/AppheaderHisory';

const StoreProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  });
  const API_Class = new API_Store_Products();
  const [reloadheader, setReloadHeader] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sản phẩm cửa hàng';
    getdata(pagination.page, pagination.pageSize);
  }, [pagination.page, pagination.pageSize, reloadheader]);

  function getdata(page, pageSize) {
    API_Class.getStore_Products(page, pageSize).then((response) => {
      setPagination({
        totalItems: response.totalItems,
        totalPages: response.totalPages,
        page: response.currentPage,
        pageSize: response.pageSize,
      });
      renderdata(response.store_products);
    });
  }

  function deleteacp(id) {
    API_Class.changeStatus(id, 1).then((response) => {
      ShowSwal('success', 'Xóa thành công');
      getdata(pagination.page, pagination.pageSize);
      setReloadHeader((prev) => !prev);
    });
  }

  function editacp(id) {
    navigate(`/store_products_edit/${id}`);
  }

  const ShowSwal = (status, title) => {
    withReactContent(Swal).fire({
      position: 'center',
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  function handlePageChange(newPage) {
    setSearchParams({ ...searchParams, page: newPage });
    navigate(`/store_products?${searchParams.toString()}`);
    getdata(newPage, pagination.pageSize);
  }

  // Hàm xác định trạng thái dựa trên giá trị status
  const getStatusBadge = (status) => {
    const statusLabel = status === 0 ? 'Còn hàng' : 'Hết hàng';
    const statusClass = status === 0 ? 'text-bg-success' : 'text-bg-warning';
    return { label: statusLabel, className: statusClass };
  };

  const columns = [
    {
      key: 'Store_ID',
      label: 'Mã cửa hàng',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_ID',
      label: 'Mã sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'Product_Stock',
      label: 'Tồn kho sản phẩm',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      label: 'Trạng thái',
      _props: { scope: 'col' },
    },
    {
      key: 'actions',
      label: 'Hành động',
      _props: { scope: 'col' },
    },
  ];

  function renderdata(items) {
    setItems(
      items.map((item, index) => {
        item.STT = index + 1;

        // Xác định trạng thái và lớp CSS
        const { label, className } = getStatusBadge(item.status);

        item.actions = (
          <>
            <ModalComponent
              {...item}
              color="danger"
              content="Bạn muốn xóa?"
              icon="cilTrash"
              status="Delete"
              actions={deleteacp}
              id={item.store_products_ID}
              nameitems={item.store_products_ID}
            ></ModalComponent>{' '}
            <ModalComponent
              {...item}
              color="primary"
              content="Bạn muốn chỉnh sửa?"
              icon="cilPen"
              status="Edit"
              actions={editacp}
              id={item.Store_ID}
              nameitems={item.Product_ID}
            ></ModalComponent>
          </>
        );

        // Cập nhật trạng thái với phần tử <span> và lớp CSS
        item.status = (
          <span className={`badge ${className}`}>{label}</span>
        );

        return item;
      })
    );
  }

  return (
    <CCard>
      <CCardHeader>
        <CRow className="align-items-center">
          <CCol sm="3">
            <h5 id="traffic" className="card-title mb-0">
              Danh sách sản phẩm cửa hàng
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="store_products_ID"
              API={API_Store_Products}
              path="store_products"
              page={pagination.page}
              loaddata={getdata}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/store_products_add')}
              color="success"
              className="float-end me-2 px-4 text-white"
            >
              <CIcon icon={icon.cilPlus} /> Thêm mới
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <div style={{ minHeight: '70vh' }}>
        <CTable striped hover columns={columns} items={items} />

        {items.length === 0 && <div className="text-center">Không có dữ liệu</div>}
      </div>

      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem
          disabled={pagination.page === 1}
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
  );
};

export default StoreProducts;
