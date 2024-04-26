import { useDispatch, useSelector } from "react-redux";
import { slimAPI } from "../api";
import { onGetBookData, onGetBooksTableData } from "../store";



export const useVentasStore = () => {

  const dispatch = useDispatch();

  const { tableInfo, productData, errorMessage } = useSelector(state => state.ventas);


  const searchByType = async ({ productType }) => {

    try {

      const { data } = await slimAPI.get(`productos/${productType}`);


      dispatch(onGetBooksTableData({data}));

    } catch (error) {

      console.log("No se encontro nunguna coinsidencia");

    }
  }

  const searchByIsbn = async ({ productIsbn }) => {
    
    
    console.log({productIsbn});


    try {

      const { data } = await slimAPI.get(`detalles/${productIsbn}`);
      console.log({data});
      dispatch(onGetBookData({data}));

    } catch (error) {

      console.log("No se encontro nunguna coinsidencia");

    }
  }



  return {

    // Properties
    tableInfo,
    productData,
    errorMessage,

    //Methods
    searchByType,
    searchByIsbn,

  }
}
