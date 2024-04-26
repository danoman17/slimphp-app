import React, { useEffect, useState } from 'react'
import { NavBarVentas, SearchByCategory } from '../'
import { useForm, useVentasStore } from '../../hooks'


const initialSearchTypes = {
  isbnSearch: '',
}

export const VentasPage = () => {


  const { isbnSearch, onInputChange } = useForm(initialSearchTypes);
  const { searchByIsbn, productData } = useVentasStore();

  const [activeProdData, setActiveProdData] = useState(false);

  const searchIsbnSubmit = (event) => {
    event.preventDefault();
    searchByIsbn({ productIsbn: isbnSearch });
  }

  useEffect(() => {
    if (!productData.isbn) {
      setActiveProdData(false);
    }else {
      setActiveProdData(true);
    }

  }, [productData]);

  return (
    <>
      <NavBarVentas />

      <SearchByCategory />

      <div className="container d-flex justify-content-center mt-5">
        <div className='col-md-10'>
          <h3>Buscar por ISBN</h3>
          <form onSubmit={searchIsbnSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder='LIB001'
                name='isbnSearch'
                value={isbnSearch}
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

            {
              (activeProdData)
                ?
                (
                  <>
                    <div className="card">
                      <div className="card-header">
                        { productData.nombre }
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">ISBN: {productData.isbn}</li>
                        <li className="list-group-item">Autor: {productData.autor}</li>
                        <li className="list-group-item">Editorial: {productData.editorial}</li>
                        <li className="list-group-item">Fecha Publicación: {productData.fechaPublicacion}</li>
                        <li className="list-group-item">Precio: {productData.precio}</li>
                      </ul>
                    </div>
                  </>
                ) :
                (
                  <>
                    <h3>Información...</h3>
                  </>
                )
            }




          </div>
        </div>

      </div>


    </>
  )
}

