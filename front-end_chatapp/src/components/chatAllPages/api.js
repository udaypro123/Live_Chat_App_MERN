const authBase = `http://localhost:8000/api/v1/users`
import axios from "axios"



export const getAllUsers = async () => {
        let response = await axios.get(`${authBase}/getUser`)
        return response.data
}


