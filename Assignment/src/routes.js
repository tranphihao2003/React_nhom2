import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// page admin
const Products = React.lazy(() => import('./views/products/Products'))
const ProductsAdd = React.lazy(() => import('./views/products/Products-add'))
const ProductsEdit = React.lazy(() => import('./views/products/ProductEdit'))

const Shipperadd = React.lazy(() => import('./views/shipper/ShipperAdd'))
const Shipper = React.lazy(() => import('./views/shipper/shipper'))
const ShipperEdit = React.lazy(() => import('./views/shipper/ShipperEdit'))

const Suppliers = React.lazy(() => import('./views/suppliers/suppliers'))
const SuppliersAdd = React.lazy(() => import('./views/suppliers/suppliersAdd'))
const SupplierEdit = React.lazy(() => import('./views/suppliers/SupplierEdit'))

const Stores = React.lazy(() => import('./views/stores/Stores'))
const Stores_Add = React.lazy(() => import('./views/stores/Stores_Add'))
const Stores_Edit = React.lazy(() => import('./views/stores/Stores_Edit'))

const Store_Products = React.lazy(() => import('./views/store_products/Store_Products'))
const Store_Products_Add = React.lazy(() => import('./views/store_products/Store_Products_Add'))
const Store_Products_Edit = React.lazy(() => import('./views/store_products/Store_Products_Edit'))

const Accounts = React.lazy(() => import('./views/accounts/Accounts'))
const Accounts_Add = React.lazy(() => import('./views/accounts/Accounts_Add'))
const Accounts_Edit = React.lazy(() => import('./views/accounts/Accounts_Edit'))

const Employees = React.lazy(() => import('./views/employees/Employees'))
const AddEmployees = React.lazy(() => import('./views/employees/AddEmployees'))
const EditEmployees = React.lazy(() => import('./views/employees/EditEmployees'))

const Customers = React.lazy(() => import('./views/customers/Customers'))
const AddCustomers = React.lazy(() => import('./views/customers/AddCustomers'))
const EditCustomers = React.lazy(() => import('./views/customers/EditCustomers'))

const Genres = React.lazy(() => import('./views/genres/Genres'))
const AddGenres = React.lazy(() => import('./views/genres/AddGenres'))
const EditGenres = React.lazy(() => import('./views/genres/EditGenres'))
//Các bảng
const Orders = React.lazy(() => import('./views/orders/Orders'))
const Order_Detail = React.lazy(() => import('./views/orders/Order_Detail'))
const Order_Add = React.lazy(() => import('./views/orders/Order_Add'))
const Order_Update = React.lazy(() => import('./views/orders/Order_Update'))

//profile
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const PublicRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, exact: true, requiredRole: '' },

  // Product routes
  { path: '/products', name: 'Products', element: Products, requiredRole: ['Admin'] },
  {
    path: '/products/add',
    name: 'Add Product',
    element: ProductsAdd,
    requiredRole: ['Admin', 'WarehouseStaff'],
  },
  {
    path: '/products/:id',
    name: 'Edit Product',
    element: ProductsEdit,
    requiredRole: ['Admin', 'WarehouseStaff'],
  },

  // Shipper routes
  {
    path: '/Shippers/add',
    name: 'Add Shipper',
    element: Shipperadd,
    requiredRole: ['Admin', ' StoreManager'],
  },
  { path: '/Shippers', name: 'Shipper', element: Shipper, requiredRole: [''] },
  {
    path: '/Shippers/:id',
    name: 'Edit Shipper',
    element: ShipperEdit,
    requiredRole: ['Admin', ' StoreManager'],
  },

  // Supplier routes
  {
    path: '/suppliers',
    name: 'Suppliers',
    element: Suppliers,
    requiredRole: ['Admin', ' StoreManager'],
  },
  {
    path: '/suppliers/add',
    name: 'Add Supplier',
    element: SuppliersAdd,
    requiredRole: ['Admin', ' StoreManager'],
  },
  {
    path: '/suppliers/:id',
    name: 'Edit Supplier',
    element: SupplierEdit,
    requiredRole: ['Admin', ' StoreManager'],
  },

  // Store routes
  { path: '/stores', name: 'Stores', element: Stores, requiredRole: [''] },
  { path: '/stores_add', name: 'Add Store', element: Stores_Add, requiredRole: ['Admin'] },
  { path: '/stores_edit/:id', name: 'Edit Store', element: Stores_Edit, requiredRole: ['Admin'] },
  {
    path: '/store_products',
    name: 'Store Products',
    element: Store_Products,
    requiredRole: [''],
  },
  {
    path: '/store_products_add',
    name: 'Add Store Product',
    element: Store_Products_Add,
    requiredRole: ['Admin', 'WarehouseStaff', 'StoreManager'],
  },
  {
    path: '/store_products_edit',
    name: 'Edit Store Product',
    element: Store_Products_Edit,
    requiredRole: ['Admin', 'WarehouseStaff', 'StoreManager'],
  },

  // Account routes
  {
    path: '/accounts',
    name: 'Accounts',
    element: Accounts,
    requiredRole: ['Admin', ' StoreManager', ''],
  },
  {
    path: '/accounts_add',
    name: 'Add Account',
    element: Accounts_Add,
    requiredRole: ['Admin', ' StoreManager'],
  },
  {
    path: '/accounts_edit',
    name: 'Edit Account',
    element: Accounts_Edit,
    requiredRole: ['Admin', ' StoreManager'],
  },

  // Employee routes
  {
    path: '/employees',
    name: 'Employees',
    element: Employees,
    requiredRole: ['Admin', ' StoreManager'],
  },
  {
    path: '/AddEmployees',
    name: 'Add Employee',
    element: AddEmployees,
    requiredRole: ['Admin', ' StoreManager'],
  },
  {
    path: '/EditEmployees',
    name: 'Edit Employee',
    element: EditEmployees,
    requiredRole: ['Admin', ' StoreManager'],
  },

  // Customer routes
  {
    path: '/customers',
    name: 'Customers',
    element: Customers,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },
  {
    path: '/AddCustomers',
    name: 'Add Customer',
    element: AddCustomers,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },
  {
    path: '/EditCustomers',
    name: 'Edit Customer',
    element: EditCustomers,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },

  // Genre routes
  { path: '/genres', name: 'Genres', element: Genres, requiredRole: ['Admin', 'WarehouseStaff'] },
  { path: '/AddGenres', name: 'Add Genre', element: AddGenres, requiredRole: ['Admin'] },
  { path: '/EditGenres', name: 'Edit Genre', element: EditGenres, requiredRole: ['Admin'] },

  // Order routes
  {
    path: '/orders',
    name: 'Orders',
    element: Orders,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },
  {
    path: '/orders/order_detail/:id',
    name: 'Order Detail',
    element: Order_Detail,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },
  {
    path: '/order_add',
    name: 'Add Order',
    element: Order_Add,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },
  {
    path: '/order_update',
    name: 'Update Order',
    element: Order_Update,
    requiredRole: ['Admin', 'salesman ', 'StoreManager'],
  },
  {
    path: '/profile',
    name: 'Profile',
    element: Profile,
    requiredRole: [''],
  },
]

const PrivateRoutes = []

export { PublicRoutes, PrivateRoutes }
