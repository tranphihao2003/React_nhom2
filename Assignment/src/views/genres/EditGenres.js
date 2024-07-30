// import React, { useEffect, useState } from 'react'
// import { useParams, useHistory } from 'react-router-dom'
// import API_Genres from '../../services/API/API_Genres'
// import { CButton, CCol, CForm, CFormInput, CFormLabel, CAlert } from '@coreui/react'

// const EditGenres = () => {
//   const API_Class = new API_Genres()
//   const [validated, setValidated] = useState(false)
//   const [status, setStatus] = useState(null)
//   const [formData, setFormData] = useState({
//     Genre_Name: '',
//   })
//   const { id } = useParams()
//   const history = useHistory()

//   useEffect(() => {
//     document.title = 'Chỉnh sửa - Loại'
//     getData()
//   }, [])

//   const getData = () => {
//     console.log('Fetching genre data for id:', id)
//     API_Class.getGenres(id)
//       .then((response) => {
//         console.log('Response from getGenres:', response)
//         if (response && response[0]) {
//           setFormData(response[0])
//         } else {
//           console.error('Invalid response data:', response)
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching genre data:', error)
//       })
//   }

//   const update = () => {
//     console.log('Updating genre with data:', formData)
//     API_Class.updateGenres({ ...formData, id }) // Thêm id vào formData khi gọi updateGenres
//       .then((response) => {
//         console.log('Response from updateGenres:', response)
//         setStatus(true)
//         // Chuyển hướng về trang danh sách sau khi cập nhật thành công
//         history.push('/genres')
//       })
//       .catch((error) => {
//         console.error('Error updating genre:', error)
//         setStatus(false)
//       })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const form = e.currentTarget
//     if (form.checkValidity() === false) {
//       e.stopPropagation()
//     } else {
//       update()
//     }
//     setValidated(true)
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   return (
//     <CForm className="row g-3" onSubmit={handleSubmit} noValidate validated={validated}>
//       <h1 className="text-center mb-4">Chỉnh sửa Loại</h1>
//       {status === false && (
//         <CCol md={12}>
//           <CAlert color="danger">Chỉnh sửa loại thất bại</CAlert>
//         </CCol>
//       )}
//       {status === true && (
//         <CCol md={12}>
//           <CAlert color="success">Chỉnh sửa loại thành công</CAlert>
//         </CCol>
//       )}

//       <CCol md={6}>
//         <CFormLabel htmlFor="Genre_Name">Tên loại</CFormLabel>
//         <CFormInput
//           type="text"
//           id="Genre_Name"
//           name="Genre_Name"
//           value={formData.Genre_Name}
//           onChange={handleChange}
//           required
//         />
//       </CCol>

//       <CCol md={12}>
//         <CButton color="primary" type="submit">
//           Chỉnh sửa loại
//         </CButton>
//       </CCol>
//     </CForm>
//   )
// }

// export default EditGenres
