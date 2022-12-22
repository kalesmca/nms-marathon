// import axios from "axios";
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { async } from "@firebase/util";


export const  getUserList = async() =>{
  const usersCollectionRef = collection(db, "users");

  const data = await getDocs(usersCollectionRef);
  const dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return dataList;
      
}

export const  updateUser = async(newObj) =>{
  if(localStorage.getItem("adminRights") === "*****"){
    const userDoc = doc(db, "users", newObj.id);
    await updateDoc(userDoc, newObj); 
  } else {
    console.log("you can't access")
  }
     
}

// const ApiService ={
//     saveFund: async(param) =>{
//         await axios.post('http://localhost:3000/customers', {
//             firstName: 'Fred',
//             lastName: 'Flintstone'
//           })
//           .then(function (response) {
//             console.log(response);
//             return response;
//           })
//           .catch(function (error) {
//             console.log(error);
//             return error;
//           });
//     },
//     getUserList:async() =>{

//     }

// }

// export default ApiService;