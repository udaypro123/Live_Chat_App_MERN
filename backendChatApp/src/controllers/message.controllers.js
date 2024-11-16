import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";

export const sendMessage = async (req, res, err, next) => {
    const { message, recieverId, senderId } = req.body
    try {
        if (message && recieverId && senderId) {
           let conversation= new Conversation.findOne({participants:{$all:[senderId,recieverId]}}) 

           if(!conversation){
            conversation= new Conversation.create({
                participants:[senderId, recieverId]
            })       
           }

           let message= new Message.create({
            senderId,
            recieverId,
            message,
            coversationId:conversation
           })

           if(message){
            conversation.message.push(message._id)
           }


           await Promise.all([message.save(), conversation.save()])
           return res.status(201)
           .json(new ApiResponse(200, message, "successfully send message"))
        }

    } catch (error) {
        throw new ApiError(400, "Send message failed ")
    }
}

export const getMessage = async (req, res, err, next) => {
    const {recieverId, senderId } = req.body
    try {
        if ( recieverId && senderId) {
           let conversation= new Conversation.findOne({participants:{$all:[senderId,recieverId]}}) 

           if(!conversation){

           }

           return res.status(201)
           .json(new ApiResponse(200, [], "successfully send message"))
        }

    } catch (error) {
        throw new ApiError(400, "Send message failed ")
    }
}