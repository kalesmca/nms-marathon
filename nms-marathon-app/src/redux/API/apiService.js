import axios from "axios";

const ApiService ={
    saveFund: async(param) =>{
        await axios.post('http://localhost:3000/customers', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error;
          });
    }
}

export default ApiService;