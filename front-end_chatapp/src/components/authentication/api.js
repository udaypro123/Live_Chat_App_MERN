const authBase = `http://localhost:8000/api/v1/users`
import axios from "axios"


export const registerUser = async (data) => {
        let response = await axios.post(`${authBase}/register`, data)
        return response.data
}


export const loginUser = async (data) => {
        let response = await axios.post(`${authBase}/login`, data, { withCredentials: true,  })
        return response.data
}


export const logoutUser = async () => {
        let response = await axios.post(`${authBase}/logout`, {}, { withCredentials: true,  })
        return response.data
}


export const refreshToken = async () => {
        let response = await axios.post(`${authBase}/refreshToken`)
        return response.data
}

