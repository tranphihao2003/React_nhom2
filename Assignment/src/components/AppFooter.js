import React from 'react'
import { CFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAlbum } from '@coreui/icons'
const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="me-1">Hãng Đĩa Thời Đại</span>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <CIcon customClassName="sidebar-brand-full" icon={cilAlbum} height={32} />
        {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        <span className="ms-2 fw-semibold">Hãng Đĩa Thời Đại</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
