import React, { useEffect, useState } from 'react'
import { useForm, useVentasStore } from '../../hooks';


const initialSearchTypes = {
  categorySearch: '',
}


export const SearchByCategory = () => {

  const { searchByType, tableInfo } = useVentasStore();
  const { categorySearch, onInputChange } = useForm(initialSearchTypes);
  
  const [tableShow, setTableShow] = useState(false);

  const searchCategerySubmit = (event) => {
    event.preventDefault();
    searchByType({ productType: categorySearch });
  }

  useEffect(() => {
    if(tableInfo.length > 0){
      setTableShow(true);
    }
  }, [tableInfo]);

  return (

      <>
        <div className="container d-flex justify-content-center">
          <div className='col-md-10'>
            <h3>Buscar por categoría</h3>
            <form onSubmit={searchCategerySubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder='libros, comics...'
                  name='categorySearch'
                  value={categorySearch}
                  onChange={onInputChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                >
                  Buscar
                </button>
              </div>
            </form>
            <div className='col'>


              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ISBN</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (tableShow)
                      ?
                      (

                        tableInfo.map(item => {
                          return (
                            <tr key={item.isbn}>
                              <th scope="row">{item.isbn}</th>
                              <td>{item.nombre}</td>
                              <td>{item.tipo}</td>
                            </tr>
                          )
                        })

                      ) :
                      (
                        <>
                          <tr>
                            <th>0001</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                          </tr>
                        </>
                      )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>

  )
}

