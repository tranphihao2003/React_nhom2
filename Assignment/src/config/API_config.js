
import config from './config'

const API_config = {
  Users: {
    login: `${config.api}/accounts/login`,
    list: `${config.api}/accounts`,
    create: `${config.api}/accounts`,
    update: `${config.api}/accounts`,
    delete: `${config.api}/accounts`,
    backdata: `${config.api}/accounts/backdata`,
    updatestatus: `${config.api}/accounts/backdata`, // Assuming update backdata is the same as updatestatus
    verify: `${config.api}/accounts/verify`,
  },
  products: {
    list: `${config.api}/products`,
    create: `${config.api}/products`,
    update: `${config.api}/products`,
    delete: `${config.api}/products`,
    Stop: `${config.api}/products/stop`,
    backdata: `${config.api}/products/backdata/all`,
    updatestatus: `${config.api}/products/backdata`, // Assuming update backdata is the same as updatestatus
    search : `${config.api}/products/searchkey`,
  },
  Customers: {
    list: `${config.api}/customers`,
    create: `${config.api}/customers`,
    update: `${config.api}/customers`,
    delete: `${config.api}/customers`,
    backdata: `${config.api}/customers/backdata/all`,
    updatestatus: `${config.api}/customers/backdata`, // Assuming update backdata is the same as updatestatus
  },
  employees: {
    list: `${config.api}/employees`,
    list_add: `${config.api}/employees/listadd`,
    list_detail: `${config.api}/employees/listdetail`,
    create: `${config.api}/employees`,
    update: `${config.api}/employees`,
    delete: `${config.api}/employees`,
    stop: `${config.api}/employees/stop`,
    backdata: `${config.api}/employees/backdata/all`,
    updatestatus: `${config.api}/employees/backdata`,
  },
  orders: {
    list: `${config.api}/orders`,
    create: `${config.api}/orders`,
    update: `${config.api}/orders`,
    delete: `${config.api}/orders`,
    backdata: `${config.api}/orders/backdata/all`,
    updatestatus: `${config.api}/orders/backdata`, // Assuming update backdata is the same as updatestatus
  },
  Shippers: {
    list: `${config.api}/shippers`,
    create: `${config.api}/shippers`,
    update: `${config.api}/shippers`,
    delete: `${config.api}/shippers`,
    Stop: `${config.api}/shippers/stop`,
    backdata: `${config.api}/shippers/backdata/all`,
    updatestatus: `${config.api}/shippers/backdata`, // Assuming update backdata is the same as updatestatus
  },
  suppliers: {
    list: `${config.api}/suppliers`,
    create: `${config.api}/suppliers`,
    update: `${config.api}/suppliers`,
    delete: `${config.api}/suppliers`,
    backdata: `${config.api}/suppliers/backdata/all`,
    updatestatus: `${config.api}/suppliers/backdata`, // Assuming update backdata is the same as updatestatus
  },
  genres: {
    list: `${config.api}/genres`,
    create: `${config.api}/genres`,
    update: `${config.api}/genres`,
    delete: `${config.api}/genres`,
    backdata: `${config.api}/genres/backdata/all`,
    updatestatus: `${config.api}/genres/backdata`, // Assuming update backdata is the same as updatestatus
  },
  Store_Products: {
    list: `${config.api}/store_products`,
    create: `${config.api}/store_products`,
    update: `${config.api}/store_products`,
    delete: `${config.api}/store_products`,
    backdata: `${config.api}/store_products/backdata/all`,
    updatestatus: `${config.api}/store_products/backdata`, // Assuming update backdata is the same as updatestatus
  },
  stores: {
    list: `${config.api}/store`,
    create: `${config.api}/store`,
    update: `${config.api}/store`,
    delete: `${config.api}/store`,
    backdata: `${config.api}/store/backdata/all`,
    updatestatus: `${config.api}/store/backdata`, // Assuming update backdata is the same as updatestatus
  },
}

export default API_config
