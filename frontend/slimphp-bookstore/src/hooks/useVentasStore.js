


export const useVentasStore = () => {


  const searchByType = async ({ productType }) => {

    try {

      const { data } = await slimAPI.post(`productos/${productType}`);

      console.log({data})

    } catch (error) {

      console.log("No se encontro nunguna coinsidencia");

    }
  }



  return {


    //Methods
    searchByType

  }
}
