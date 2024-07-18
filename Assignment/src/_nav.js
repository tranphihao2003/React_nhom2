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
        to: '/add',
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
      {
        component: CNavItem,
        name: 'Thêm',
        to: '/Order_Add',
      },
      {
        component: CNavItem,
        name: 'Sửa',
        to: '/Order_Update',
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
