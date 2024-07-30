import config from './config'
const API_config = {
  Users: {
    login: `${config.api}/accounts/login`,
    list: `${config.api}/accounts`,
    create: `${config.api}/accounts`,
    update: `${config.api}/accounts`,
    delete: `${config.api}/accounts`,
  },
  products: {
    list: `${config.api}/products`,
    create: `${config.api}/products`,
    update: `${config.api}/products`,
    delete: `${config.api}/products`,
  },
  customers: {
    list: `${config.api}/customers`,
    create: `${config.api}/customers`,
    update: `${config.api}/customers`,
    stop: `${config.api}/customers/stop`,
    delete: `${config.api}/customers`,
    backdata: `${config.api}/customers/backdata/all`,
    updatestatus: `${config.api}/customers/backdata`,
  },

  employees: {
    list: `${config.api}/employees`,
    create: `${config.api}/employees`,
    update: `${config.api}/employees`,
    delete: `${config.api}/employees`,
  },
  orders: {
    list: `${config.api}/orders`,
    create: `${config.api}/orders`,
    update: `${config.api}/orders`,
    delete: `${config.api}/orders`,
  },
  shippers: {
    list: `${config.api}/shippers`,
    create: `${config.api}/shippers`,
    update: `${config.api}/shippers`,
    delete: `${config.api}/shippers`,
  },
  suppliers: {
    list: `${config.api}/suppliers`,
    create: `${config.api}/suppliers`,
    update: `${config.api}/suppliers`,
    delete: `${config.api}/suppliers`,
  },
  genres: {
    list: `${config.api}/customers`,
    create: `${config.api}/customers`,
    update: `${config.api}/customers`,
    stop: `${config.api}/customers/stop`,
    delete: `${config.api}/customers`,
    backdata: `${config.api}/customers/backdata/all`,
    updatestatus: `${config.api}/customers/backdata`,
  },
  store_products: {
    list: `${config.api}/store_products`,
    create: `${config.api}/store_products`,
    update: `${config.api}/store_products`,
    delete: `${config.api}/store_products`,
  },
  store: {
    list: `${config.api}/store`,
    create: `${config.api}/store`,
    update: `${config.api}/store`,
    delete: `${config.api}/store`,
  },
}
export default API_config
