const authBase = `http://localhost:8000/api/v1/course`
import axios from "axios"


export const fileUploadONCloudinary = async (data) => {
        let response = await axios.post(`${authBase}/upload`, data)
        return response.data
}

export const getAllCourses = async () => {
        let response = await axios.get(`${authBase}/getallcourses`)
        return response.data
}
// export const downloadUrlformCloudaniray = async (data) => {
//         let response = await axios.post(`${authBase}/downloadUrl`, data)
//         return response
// }

