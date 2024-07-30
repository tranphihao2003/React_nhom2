import React, { useState } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
const ModalComponent = (props) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton
        
        color={props.color ? props.color : null}
        onClick={() => setVisible(!visible)}
      >
        {props.icon ? <CIcon icon={icon[props.icon]} /> : null}
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">
            {props.status} : {props.nameitems}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{props.content}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Hủy
          </CButton>
          <CButton
            onClick={() => {
              setVisible(false)
              props.actions(props.id)
            }}
            color="primary"
          >
            Đồng ý
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalComponent
