import axios from 'axios'
import enviroment from '../enviroment';
const BackendService = {
    userLogged:{
        userName:"",
        userId:""      
    },
    loginSuccess:{
        value:false
    },
    signUp:(data)=>{
        return axios.post(enviroment.API+"/chatapp/signUp",{
            data
        })
        
    },
    signIn:(data)=>{
        return axios.post(enviroment.API+"/chatapp/signIn",{
            data
        })   
    },
    getAllUsers:()=>{
        return axios.get(enviroment.API+"/chatapp/getallusers")   
    }
}
export default BackendService;