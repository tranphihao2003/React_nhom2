import React, { useEffect, useState } from 'react';
import { CButton, CTable, CPagination, CPaginationItem, CCard, CCardHeader, CRow, CCol } from '@coreui/react';
import API_Accounts from '../../services/API/API_Accounts';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ModalComponent from '../../components/modal/modalComponent';
import AppHeaderHistory from '../../components/AppheaderHisory';

const Accounts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: searchParams.get('page') ? parseInt(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : 10,
    totalItems: 0,
    totalPages: 0,
  });
  const API_Class = new API_Accounts();
  const [reloadheader, setReloadHeader] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Tài khoản';
    getData(pagination.page, pagination.pageSize);
  }, [pagination.page, pagination.pageSize, reloadheader]);

  function getData(page, pageSize) {
    API_Class.getAccounts(page, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.accounts)) {
          setPagination({
            totalItems: response.totalItems,
            totalPages: response.totalPages,
            page: response.currentPage,
            pageSize: response.pageSize,
          });
          renderData(response.accounts);
        } else {
          console.error('Dữ liệu trả về không phải là mảng:', response);
          ShowSwal('error', 'Dữ liệu không hợp lệ');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        ShowSwal('error', 'Không thể tải dữ liệu');
      });
  }

  function deleteacp(id) {
    API_Class.changestatus(id, 1)
      .then((response) => {
        if (response.success) {
          ShowSwal('success', 'Xóa thành công');
          getData(pagination.page, pagination.pageSize);
          setReloadHeader((prev) => !prev);
        } else {
          ShowSwal('error', 'Xóa thất bại');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi xóa tài khoản:', error);
        ShowSwal('error', 'Không thể xóa tài khoản');
      });
  }

  function editacp(id) {
    navigate(`/accounts_edit/${id}`);
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
    navigate(`/accounts?${searchParams.toString()}`);
    getData(newPage, pagination.pageSize);
  }

  const columns = [
    {
      key: 'Account_ID',
      label: 'ID Tài khoản',
      _props: { scope: 'col' },
    },
    {
      key: 'Username',
      label: 'Tên đăng nhập',
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

  function renderData(data) {
    if (Array.isArray(data)) {
      setItems(
        data.map((item, index) => {
          item.STT = index + 1;
          const { label, className } = getStatusBadge(item.status);

          item.status = (
            <span className={`badge ${className}`}>{label}</span>
          );
          item.actions = (
            <>
              <ModalComponent
                {...item}
                color="danger"
                content="Bạn muốn xóa?"
                icon="cilTrash"
                status="Delete"
                actions={deleteacp}
                id={item.Account_ID}
                nameitems={item.Username}
              />
              <ModalComponent
                {...item}
                color="primary"
                content="Bạn muốn chỉnh sửa?"
                icon="cilPen"
                status="Edit"
                actions={editacp}
                id={item.Account_ID}
                nameitems={item.Username}
              />
            </>
          );

          return { ...item, key: item.Account_ID };
        })
      );
    } else {
      console.error('Dữ liệu không phải là mảng:', data);
      ShowSwal('error', 'Dữ liệu không hợp lệ');
    }
  }

  const getStatusBadge = (status) => {
    const statusLabel = status === 0 ? 'Hoạt động' : 'Không hoạt động';
    const statusClass = status === 0 ? 'text-bg-success' : 'text-bg-danger';
    return { label: statusLabel, className: statusClass };
  };

  return (
    <CCard>
      <CCardHeader>
        <CRow className="align-items-center">
          <CCol sm="3">
            <h5 id="traffic" className="card-title mb-0">
              Danh sách tài khoản
            </h5>
          </CCol>

          <CCol sm="9" className="d-md-block">
            <AppHeaderHistory
              id="Account_ID"
              API={API_Accounts}
              path="accounts"
              page={pagination.page}
              loaddata={getData}
              status={reloadheader}
            />
            <CButton
              onClick={() => navigate('/accounts_add')}
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
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </CCard>
  );
};

export default Accounts;
