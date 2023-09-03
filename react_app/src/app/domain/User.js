import { login,logout,whoAmI } from "../interfaces/interface";

export class User {
   
    
    async login(username, password) {
        try{

            const response = await login(username, password);
            //store token at local storage
            localStorage.setItem('helsten_token', response.data.token);
            return {sucess: true}
        }
        catch(error){
            return {sucess: false, error: error}
        }
    }
        

    async logUserOut() {
        try{
            const token = localStorage.getItem('helsten_token');
            const response = await logout(token);
            if (response.status === 200 || response.status === 204){

                localStorage.removeItem('helsten_token');
                return {sucess: true}
            }
            else{
                return {sucess: false, error: response}
            }
        }
        catch(error){
            return {sucess: false, error: error}
        }
    }

    async getIdentity() {
        try{
            const token = localStorage.getItem('helsten_token');
            const response = await whoAmI(token);
            if (response.status === 200 || response.status === 204){
                return {sucess: true, data: response.data.user}
            }
            else{
                return {sucess: false, error: response}
            }
        }
        catch(error){
            return {sucess: false, error: error}
        }
    }


    }