import React, { useState } from 'react';
import { useFormik } from 'formik';
import CreateProductsTable from './CreateProductsTable';
import Modal from './Modal';
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([])
  const [boolErrors, setErrors] = useState()
  const auth = useAuthUser()
  let navigate = useNavigate()
  

  
  const validate = values => {
    const errors = {};
    setErrors(false)
    if (values.ordered.length === 0) {
      setErrors(true)
      errors.ordered = 'Нет товаров';
  } else {
    for (let i = 0; i < values.ordered.length; i++) {
      if (values.weight[i] === undefined || values.weight[i] === "") {
        setErrors(true)
      }
    }
  }
  if (boolErrors) {
    errors.weight = 'Заполните количество во всех товарах.'
  }
  return errors
}
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
      initialValues: {
        email: auth().email,
        location: "",
        ordered: [],
        weight: [],
      },
      validate,
      enableReinitialize: true,
      onSubmit: values => {
        console.log(values);
        axios.post(`http://localhost:3000/orders`, { values })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data)
          navigate(`/products/${res.data}`)
        }
      })
      },
    });
    
    if (modalOpen === false) {
      return (
        <div>
      <form className='' onSubmit={formik.handleSubmit}>
        <div className="mb-6 mt-4 ml-3">
        <label className='mr-3'>Магазин</label>
        <input
          id="contractor"
          name="contractor"
          type="contractor"
          onChange={formik.handleChange}
          value={formik.values.contractor}
        />
        </div>
        
        <div>
        <button onClick={() => {
          setModalOpen(true);
        }} type="button" className='mb-2 ml-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg border-none'>Добавить товар</button>
        </div>
        <CreateProductsTable setTableData={setTableData} tableData={tableData}/>
        {tableData.length === 0 ? <div className='grid pt-4 text-lg text-blue-500 place-items-center'>Добавьте товары для заказа</div> : null}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg border-none absolute right-0 m-4 mt-12" type="submit" onClick={() => {
        formik.setFieldValue("ordered", tableData.map(row => row.original.quantity));
        formik.setFieldValue("weight", tableData.map(row => row.original.quantity));
        }}>Создать заказ</button>
        {formik.errors.weight ? <div>{formik.errors.weight}</div> : null}
        {formik.errors.ordered ? <div>{formik.errors.ordered}</div> : null}
      </form>
      </div>
      )
    }
    else {
      return (
        <>
        {modalOpen && <Modal className="" tableData={tableData} setTableData={setTableData} closeModal={setModalOpen}/>}
        </>
      )
    }
  };

export default CreateForm;