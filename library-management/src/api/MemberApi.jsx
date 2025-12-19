import axios from "axios";
const API_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

export const registerMember = async(data)=>{
    const res = await axios.post(`${API_URL}/register`, data,{
        headers: {  
                'Content-Type': 'application/json'
            }
        });
        return res.data; 
    }

export const login = async(data) =>{
    const res = await axios.post(`${API_URL}/login`, data,{
        headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
}    
