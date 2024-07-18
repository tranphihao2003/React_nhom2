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
const Shipperadd = React.lazy(() => import('./views/shipper/shipper-add'))
const Shipper = React.lazy(() => import('./views/shipper/shipper'))
const Suppliers = React.lazy(() => import('./views/suppliers/suppliers'))
const SuppliersAdd = React.lazy(() => import('./views/suppliers/suppliers-add'))
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

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/products', name: 'Products', element: Products },
  { path: '/products/add', name: 'Add Product', element: ProductsAdd },
  { path: '/Shipper/add', name: 'add Shipper', element: Shipperadd },
  { path: '/Shipper', name: 'Shipper', element: Shipper },
  { path: '/suppliers', name: 'suppliers', element: Suppliers },
  { path: '/suppliers/add', name: 'suppliers add', element: SuppliersAdd },
  { path: '/stores', name: 'Stores', element: Stores },
  { path: '/stores_add', name: 'Stores_Add', element: Stores_Add },
  { path: '/stores_edit', name: 'Stores_Edit', element: Stores_Edit },
  { path: '/store_products', name: 'Store_Products', element: Store_Products },
  { path: '/store_products_add', name: 'Store_Products_Add', element: Store_Products_Add },
  { path: '/store_products_edit', name: 'Store_Products_Edit', element: Store_Products_Edit },
  { path: '/accounts', name: 'Accounts', element: Accounts },
  { path: '/accounts_add', name: 'Accounts_Add', element: Accounts_Add },
  { path: '/accounts_edit', name: 'Accounts_Edit', element: Accounts_Edit },

  { path: '/employees', name: 'Employees', element: Employees },
  { path: '/AddEmployees', name: 'AddEmployees', element: AddEmployees },
  { path: '/EditEmployees', name: 'EditEmployees', element: EditEmployees },

  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/AddCustomers', name: 'AddCustomers', element: AddCustomers },
  { path: '/EditCustomers', name: 'EditCustomers', element: EditCustomers },

  { path: '/genres', name: 'Genres', element: Genres },
  { path: '/AddGenres', name: 'AddGenres', element: AddGenres },
  { path: '/EditGenres', name: 'EditGenres', element: EditGenres },
  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/orders/order_detail/:id', name: 'Order_Detail', element: Order_Detail },
  { path: '/order_add', name: 'Order_Add', element: Order_Add },
  { path: '/order_update', name: 'Order_Update', element: Order_Update },
]

export default routes
