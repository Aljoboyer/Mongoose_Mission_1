import mongoose, { Schema, model } from "mongoose";
import { PracticeDataInterFace, infoInterFace } from "./practice.interface";


export const PracticeSchema = new Schema<PracticeDataInterFace>({
    
        name: {
            type: String
        },
        email: {
            type: String
        },
        age: {
            type: Number
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipcode: String,
        },
        favorites: {
            color:  String,
            food:  String,
            movie:  String
        },
        friends: Array<infoInterFace>
      
})

export const PracticeCollection =  mongoose.model<PracticeDataInterFace>("PracticeCollection", PracticeSchema);


