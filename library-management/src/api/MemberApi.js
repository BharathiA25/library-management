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
