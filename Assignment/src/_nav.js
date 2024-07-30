import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilTruck,
  cilLan,
  cilAlbum,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilCart,
  cilHome,
  cilHouse,
  cilGroup,
  cilUser,
  cilUserFollow,
  cilClearAll,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'products',
    to: '/products',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/products/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/Orders',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Shipper',
    to: '/Shipper',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/Shipper',
      },
      {
        component: CNavItem,
        name: 'Thêm người giao hình',
        to: '/Shipper/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Nhà phân phối',
    to: '/suppliers',
    icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/suppliers',
      },
      {
        component: CNavItem,
        name: 'Thêm nhà phân phối',
        to: '/suppliers/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Stores',
    to: '/stores',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/stores',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/stores_add',
      },
      {
        component: CNavItem,
        name: 'Sửa',
        to: '/stores_edit',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Store Products',
    to: '/store_products',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/store_products',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/store_products_add',
      },
      {
        component: CNavItem,
        name: 'Sửa',
        to: '/store_products_edit',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Accounts',
    to: '/accounts',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/accounts',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/accounts_add',
      },
      {
        component: CNavItem,
        name: 'Sửa',
        to: '/accounts_edit',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Employees',
    to: '/employees',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/Employees',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/AddEmployees',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/Customers',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/AddCustomers',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Genres',
    to: '/genres',
    icon: <CIcon icon={cilClearAll} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hiển thị',
        to: '/Genres',
      },
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/AddGenres',
      },
    ],
  },
]

export default _nav
