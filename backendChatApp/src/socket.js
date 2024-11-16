import { Server as SocketIoServer } from "socket.io";

const setupSocket=(server)=>{
    const io= new SocketIoServer(server, {
        cors:{
            origin: 'http://localhost:5173', 
            credentials: true,
            methods:["GET","POST"]
        }
    })

    const userSocketMap = new Map()

    const disConnected=(socket)=>{
        console.log(`User Disconnected ${socket.id}`)

        for(let [userId, socketId] of userSocketMap.entries()){
            if(socketId == socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }

    }

    io.on("connection", (socket)=>{
            const userId= socket.handshake.query.userId;
            if(userId){
                userSocketMap.set(userId, socket.id)
                console.log(`User connected ${userId} with Socket ID ${socket.id} `)
            }else{
                console.log(`User Id not provided during connection`)
            }
    })

    io.on("disconnected", ()=>disConnected(socket))
}

export default setupSocket;