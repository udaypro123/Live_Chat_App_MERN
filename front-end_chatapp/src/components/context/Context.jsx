/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext , useContext, useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"



const SocketContext = createContext(null)

export const useSocket =()=>{
    return useContext(SocketContext)
}

export const SocketProvider=({children})=>{
    const socket=useRef()
    const {userdata} = useSelector((state)=>state.user)
    let HOST='http://localhost:8000'

    const userdatal=localStorage.getItem("authUser")
    let parseUserdata=JSON.parse(userdatal)
    console.log("parseUserdata",parseUserdata)
    
    useEffect(()=>{
        if(userdata || parseUserdata){
            let userId;
            if(userdata){
                userId= userdata?._id
            }else{
                userId= parseUserdata?._id
            }

            socket.current = io(HOST, {
                withCredentials:true,
                query:{userId}
            })

            socket.current.on("connect", ()=>{
                console.log(`connected to socket server`)
            })
        }

        return ()=>{
            socket.current.disconnect()
        }
    },[userdata])

    console.log(userdata)
    return <SocketContext.Provider value={socket.current}>
        {children}
    </SocketContext.Provider>

}