import React, { useState } from 'react';
import { useFormik } from 'formik';
import CreateProductsTable from './CreateProductsTable';
import Modal from './Modal';

const CreateForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([])
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
      initialValues: {
        contractor: '',
        ordered: '',
        type: ''
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    if (modalOpen === false) {
      return (
        <div>
      <form className='' onSubmit={formik.handleSubmit}>
        <div className ="mb-6">
        <label className=''>Email Address</label>
        <input className=''
          id="ordered"
          name="ordered"
          type="ordered"
          onChange={formik.handleChange}
          value={formik.values.ordered}
        />
        </div>
        <div className="mb-6">
        <label>Магазин</label>
        <input
          id="contractor"
          name="contractor"
          type="contractor"
          onChange={formik.handleChange}
          value={formik.values.contractor}
        />
        </div>
        <div className="mb-6">
        <label className=''>Тип заказа</label>
        <input
          id="type"
          name="type"
          type="type"
          onChange={formik.handleChange}
          value={formik.values.type}
        />
        </div>
        <div>
        <button onClick={() => {
          setModalOpen(true);
        }} type="button" className='mb-2'>Добавить товар</button>
        </div>
        <CreateProductsTable tableData={tableData}/>
        <button type="submit">Submit</button>
      </form>
      </div>
      )
    }
    else {
      return (
        <>
        {modalOpen && <Modal className="" setTableData={setTableData} closeModal={setModalOpen}/>}
        </>
      )
    }
  };

export default CreateForm;