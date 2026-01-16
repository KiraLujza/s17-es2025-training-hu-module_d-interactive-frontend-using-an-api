import axios from "axios";

const myAxsios = axios.create({
     baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export function gatAuthHeaders(){
    const token = localStorage.getItem("token");
    return{
        "X-API-TOKEN": token,
        "Contect-Type": "aplication/json",
    };
}