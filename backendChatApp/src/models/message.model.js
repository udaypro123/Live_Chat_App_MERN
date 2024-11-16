import mongoose from "mongoose";

const mesaageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:true,
    },

    coversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        default:[]
    }

}, {timestamps:true})

export const Message = mongoose.model("Message", mesaageSchema)