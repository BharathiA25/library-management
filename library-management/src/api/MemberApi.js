import axios from "axios";
const API_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

export const registerMember = async (data) => {
    const res = await axios.post(`${API_URL}/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.data;
}

export const login = async (data) => {
    const res = await axios.post(`${API_URL}/login`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return res.data;
}
export const getAllmembers = async () => {
    const res = await axios.get(`${API_URL}/members`,{
        headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }
    });
    console.log("API RESPONSE DATA:", res.data);

    return res.data;
}

export const deleteMember = async (id) => {
    const res = await axios.delete(`${API_URL}/members/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data;
}

export const updateMemberStatus = async (id, isActive) => {
  const token = localStorage.getItem("token");
  console.log("token used for patch:", token);  
  const res = await axios.patch(`${API_URL}/members/${id}/status?activate=${isActive}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const editMember = async(data,member_id) =>{
    const res = await axios.put(`${API_URL}/members/${member_id}`,data,{
        headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
        }
    })
    return res.data;
}
export const issueBookforMembers = async(book_id) =>{
    const res = await axios.post(`${API_URL}/books/${book_id}/issue`,{},{
        headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "ngrok-skip-browser-warning": "true"
        }
    })
    return res.data;
}

export const returnBookforLibrary = async(issue_id) =>{
    const res = await axios.post(`${API_URL}/books/return/${issue_id}`,{},{
        headers : {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "true"
        }
    })
    return res.data
}
export const avaiableCount = async(book_id) =>{
    const res = await axios.get(`${API_URL}/books/${book_id}/available-count`,{
        headers : {
            "ngrok-skip-browser-warning": "true" 
        }
    })
    return res.data;
} 

export const getBookStore = async(member_id) =>{
    const res = await axios.get(`${API_URL}/books/${member_id}/details`,{
        headers : {
        "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem('token')}`,
         "ngrok-skip-browser-warning":"true",
        }
    })
    return res.data;
}