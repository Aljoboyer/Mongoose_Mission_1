import mongoose, { Schema, model } from "mongoose";
import { IStudent } from "./student.interface";


export const studentSchema = new Schema<IStudent>({
   name: {
    type: String
   },
   roll: {
    type: Number
   },
   section:{
    type: String
   },
   relagion:{
    type: String
   },
   class:{
    type: String
   },
})

export const Student =  mongoose.model<IStudent>("Students", studentSchema);
